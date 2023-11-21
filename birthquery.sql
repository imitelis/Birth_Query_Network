--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Debian 14.10-1.pgdg120+1)
-- Dumped by pg_dump version 14.10 (Debian 14.10-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: queries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.queries (
    id integer NOT NULL,
    user_uuid uuid NOT NULL,
    name character varying NOT NULL,
    query_url character varying NOT NULL,
    user_comment character varying NOT NULL,
    primal boolean NOT NULL,
    visible boolean NOT NULL,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT user_comment_max_length CHECK ((char_length((user_comment)::text) <= 200)),
    CONSTRAINT user_comment_min_length CHECK ((char_length((user_comment)::text) >= 8))
);


ALTER TABLE public.queries OWNER TO postgres;

--
-- Name: queries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.queries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.queries_id_seq OWNER TO postgres;

--
-- Name: queries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.queries_id_seq OWNED BY public.queries.id;


--
-- Name: query_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.query_comments (
    id integer NOT NULL,
    user_uuid uuid NOT NULL,
    query_id integer NOT NULL,
    text character varying NOT NULL,
    like_count integer NOT NULL,
    CONSTRAINT non_negative_like_count CHECK ((like_count >= 0))
);


ALTER TABLE public.query_comments OWNER TO postgres;

--
-- Name: query_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.query_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.query_comments_id_seq OWNER TO postgres;

--
-- Name: query_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.query_comments_id_seq OWNED BY public.query_comments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uuid uuid NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    CONSTRAINT username_max_length CHECK ((char_length((username)::text) <= 40)),
    CONSTRAINT username_min_length CHECK ((char_length((username)::text) >= 8))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: queries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries ALTER COLUMN id SET DEFAULT nextval('public.queries_id_seq'::regclass);


--
-- Name: query_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_comments ALTER COLUMN id SET DEFAULT nextval('public.query_comments_id_seq'::regclass);


--
-- Data for Name: queries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.queries (id, user_uuid, name, query_url, user_comment, primal, visible, created_at) FROM stdin;
6	89a1c864-6299-449f-b85c-8905afca011b	Native American families with small gap of mother age	?min_mother_age=30&max_mother_age=34&father_race_code=1002-5&mother_race_code=1002-5	First query on here using the filtering by parents race function!	f	t	2023-11-20 16:52:26.367854
7	89a1c864-6299-449f-b85c-8905afca011b	A minimum of 4000 births per county	?min_births=4000	This query seems fine	f	t	2023-11-20 17:18:00.397575
8	89a1c864-6299-449f-b85c-8905afca011b	testing only	?father_race_code=M&mother_race_code=M	testestetesteter	f	t	2023-11-20 17:19:48.848947
9	d4579aab-68b1-4b8f-ad6d-768a89a22a7f	Query with only 1 result in Georgia	?min_births=800&max_births=1000&min_mother_age=30&max_mother_age=32&max_birth_weight=3200&father_race_code=A&mother_race_code=M	A very picky query with a total births gap of 100, mother age gap of 2 years and specific father race and mother race	t	t	2023-11-20 21:05:17.726042
\.


--
-- Data for Name: query_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_comments (id, user_uuid, query_id, text, like_count) FROM stdin;
12	89a1c864-6299-449f-b85c-8905afca011b	6	All data in place	0
14	d4579aab-68b1-4b8f-ad6d-768a89a22a7f	8	better be deleting this soon...	0
15	d4579aab-68b1-4b8f-ad6d-768a89a22a7f	9	Do not recommend trying to find the county on this map	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uuid, username, password) FROM stdin;
d4579aab-68b1-4b8f-ad6d-768a89a22a7f	administrator	$2b$12$tiGUnvmqksnXrTl.bfsEu.XZQZ9dAiVu69UrAvQXlHXA7PYebZplO
89a1c864-6299-449f-b85c-8905afca011b	goodcitizen	$2b$12$0zvLPFD3wid.gPwL0ona5eCp46ehDnbs/QlND0y9.Eizhdjij6bJG
\.


--
-- Name: queries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.queries_id_seq', 9, true);


--
-- Name: query_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_comments_id_seq', 15, true);


--
-- Name: queries queries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT queries_pkey PRIMARY KEY (id);


--
-- Name: query_comments query_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_comments
    ADD CONSTRAINT query_comments_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: ix_queries_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_queries_id ON public.queries USING btree (id);


--
-- Name: ix_queries_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_queries_name ON public.queries USING btree (name);


--
-- Name: ix_queries_query_url; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_queries_query_url ON public.queries USING btree (query_url);


--
-- Name: ix_queries_user_comment; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_queries_user_comment ON public.queries USING btree (user_comment);


--
-- Name: ix_query_comments_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_query_comments_id ON public.query_comments USING btree (id);


--
-- Name: ix_query_comments_text; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_query_comments_text ON public.query_comments USING btree (text);


--
-- Name: ix_users_password; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_users_password ON public.users USING btree (password);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: queries queries_user_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.queries
    ADD CONSTRAINT queries_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public.users(uuid);


--
-- Name: query_comments query_comments_query_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_comments
    ADD CONSTRAINT query_comments_query_id_fkey FOREIGN KEY (query_id) REFERENCES public.queries(id);


--
-- Name: query_comments query_comments_user_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.query_comments
    ADD CONSTRAINT query_comments_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public.users(uuid);


--
-- PostgreSQL database dump complete
--

