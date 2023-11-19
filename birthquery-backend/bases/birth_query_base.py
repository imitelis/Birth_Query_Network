from pydantic import BaseModel, constr

"""
BirthQueryBase as a basis for the query input
pydantic automatically validates data
"""
class BirthQueryBase(BaseModel):
    father_race_code: str
    mother_race_code: str
    min_births: int
    max_births: int
    county_fips: str
    min_mother_age: float
    max_mother_age: float
    min_birth_weight: float
    max_birth_weight: float
    payment_code: int
    limit: int