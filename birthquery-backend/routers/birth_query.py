# the very basics
from fastapi import APIRouter, Request, HTTPException, Query, Depends

# models, bases and db session
from models import Users
from config.database import get_db
from sqlalchemy.orm import Session

# utils, cryptography and others
from config.bigquery import client
from utils import logger
from utils.auth import decode_authorization

"""
APIRouter for organizing our endpoints
implements APIRouter class, be careful
when importing it from the main.py
always import it at bottom and include tags
"""
router = APIRouter()


"""
Birth Query endpoint for the county natality by father race table,
mother race table and payment table, using some SQL and python
Can accept several parameters for filtering the data but it is
completely functional even without them, it is neccessary that
users are authenticated, so dont forget to add your access token!
We use JOIN tables and the if statements to filter, nothing unnatural
"""
@router.get("/birth-query")
def birth_query(
    request: Request, 
    authorization: str = None,
    db: Session = Depends(get_db),
    father_race_code: str = Query(None),
    mother_race_code: str = Query(None),
    min_births: float = Query(None),
    max_births: float = Query(None),
    county_fips: str = Query(None),
    min_mother_age: float = Query(None),
    max_mother_age: float = Query(None),
    min_birth_weight: float = Query(None),
    max_birth_weight: float = Query(None),
    payment_code: int = Query(None),
    limit: int = Query(None), 
    ):

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    decoded_token = decode_authorization(authorization)

    if decoded_token:
        user_username = decoded_token['sub']
        db_user = db.query(Users).filter(Users.username == user_username).first()
        if db_user:
            # Our majestic SQL query
            sql_query = """
                SELECT
                    father.County_of_Residence_FIPS,
                    father.County_of_Residence,
                    father.Fathers_Single_Race_Code,
                    father.Fathers_Single_Race as Fathers_Single_Race,
                    mother.Mothers_Single_Race_Code,
                    mother.Mothers_Single_Race as Mothers_Single_Race,
                    mother.Births,
                    mother.Ave_Age_of_Mother,
                    mother.Ave_Birth_Weight_gms,
                    payment.Source_of_Payment_Code,
                    payment.Source_of_Payment,
                FROM
                    `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_father_race` as father
                JOIN
                    `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_mother_race` as mother
                ON
                    father.County_of_Residence_FIPS = mother.County_of_Residence_FIPS
                JOIN
                    `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality_by_payment` as payment
                ON
                    father.County_of_Residence_FIPS = payment.County_of_Residence_FIPS
                WHERE 1=1
            """

            # For Fathers_Single_Race_Code
            if father_race_code:
                sql_query += f" AND Fathers_Single_Race_Code = '{father_race_code}'"

            # For Mothers_Single_Race_Code
            if mother_race_code:
                sql_query += f" AND Mothers_Single_Race_Code = '{mother_race_code}'"

            # For Births
            if min_births:
                sql_query += f" AND mother.Births >= {min_births}"

            if max_births:
                sql_query += f" AND mother.Births <= {max_births}"

            # For County_of_Residence_FIPS
            if county_fips:
                sql_query += f" AND father.County_of_Residence_FIPS = '{county_fips}'"

            # For Ave_Age_of_Mother
            if min_mother_age:
                sql_query += f" AND mother.Ave_Age_of_Mother >= {min_mother_age}"
    
            if max_mother_age:
                sql_query += f" AND mother.Ave_Age_of_Mother <= {max_mother_age}"

            # For Ave_Birth_Weight_gms
            if min_birth_weight:
                sql_query += f" AND mother.Ave_Birth_Weight_gms >= {min_birth_weight}"
    
            if max_birth_weight:
                sql_query += f" AND mother.Ave_Birth_Weight_gms <= {max_birth_weight}"

            # For Payment
            if payment_code:
                sql_query += f" AND payment.Source_of_Payment_Code = {payment_code}"

            # We better don't burn that thing
            if limit:
                if limit <= 5000:
                    sql_query += f" LIMIT {limit}"
                else:
                    return { "error": "too datadata" }
            else:
                sql_query += f" LIMIT 5000"

            # Make the actual query
            query_job = client.query(sql_query)
            results = query_job.result()

            # JSONify
            data = []
            for row in results:
                data.append(dict(row.items()))
    
            # Return our JSON
            if not data:
                logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                return {"message": "No results found for the given criteria"}
            else:
                logger.info(f"IP: {request.client.host}, HTTP method: {request.method}, User uuid: {db_user.uuid}")
                return { "data": data }
            
        raise HTTPException(status_code=404, detail="Non existing user")
    
    raise HTTPException(status_code=401, detail="Not authorized")