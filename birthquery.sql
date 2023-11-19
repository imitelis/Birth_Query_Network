--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

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
1	d4579aab-68b1-4b8f-ad6d-768a89a22a7f	stringst	stringst	stringst	t	t	2023-11-12 21:46:09.562299
2	d4579aab-68b1-4b8f-ad6d-768a89a22a7f	stringst	stringst	stringst	t	t	2023-11-12 21:46:12.644779
\.


--
-- Data for Name: query_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.query_comments (id, user_uuid, query_id, text, like_count) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (uuid, username, password) FROM stdin;
d4579aab-68b1-4b8f-ad6d-768a89a22a7f	administrator	$2b$12$tiGUnvmqksnXrTl.bfsEu.XZQZ9dAiVu69UrAvQXlHXA7PYebZplO
c16e7938-2602-4377-95d1-5e8a64ba33cd	stringst	$2b$12$pxdEvtRLdWK9mxnqOJ1/Xegl/K8/SF6r1gnn5tx5aq5eDT.rW0yuu
f34dcc44-9dce-4ebe-8e83-b1052a007070	mimimimimimi	$2b$12$GQMQifP6ENiLw3eORrRA6.YmO/ZlpRNJbNxKYvvUkmrTVxAthLMt2
\.


--
-- Name: queries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.queries_id_seq', 3, true);


--
-- Name: query_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.query_comments_id_seq', 1, false);


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

