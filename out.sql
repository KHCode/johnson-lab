PGDMP         3    
            y            jlab    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16395    jlab    DATABASE     h   CREATE DATABASE jlab WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE jlab;
                kris    false            �            1259    16413    member    TABLE     �  CREATE TABLE public.member (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255),
    title character varying(255),
    current boolean NOT NULL,
    credentials text,
    bio text,
    research_topic character varying(255),
    research_url character varying(255),
    current_job character varying(255),
    current_job_url character varying(255),
    osu_years character varying(20)
);
    DROP TABLE public.member;
       public         heap    kris    false            �            1259    16411    member_id_seq    SEQUENCE     �   CREATE SEQUENCE public.member_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.member_id_seq;
       public          kris    false    201            �           0    0    member_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.member_id_seq OWNED BY public.member.id;
          public          kris    false    200            #           2604    16416 	   member id    DEFAULT     f   ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.member_id_seq'::regclass);
 8   ALTER TABLE public.member ALTER COLUMN id DROP DEFAULT;
       public          kris    false    200    201    201            �          0    16413    member 
   TABLE DATA           �   COPY public.member (id, name, image, title, current, credentials, bio, research_topic, research_url, current_job, current_job_url, osu_years) FROM stdin;
    public          kris    false    201   �       �           0    0    member_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.member_id_seq', 26, true);
          public          kris    false    200            %           2606    16421    member member_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.member DROP CONSTRAINT member_pkey;
       public            kris    false    201            �     x��X�S9�<�+�io�
ی��}
B�8�b��^]UJ3��k�9I�w��ߓ��ARG.�����~�"��̈�j)�Թ�ZEcQ�5�q��N�%v.���r-�P�(%�wꎬk\��Ggl��?eCv��+\�􊽓����c7&ኳӜ%k�w���e:��8|�{AJ�Z�q%�W���8~��'aS��P{l�3�Cj�q��ʿd*��Z�T"�gi�ʰ�U��ʎ"�3��.��2�؉F���J������p�>�%n����>XJ�����6,5�a��'>�g�Pb��zt��ues��T��a��Rt+����gwĖ���@��+"�����V��;%)����^��I�numYY�� @*�vX�JJ�魲�{��e�+�|���x����h������e^[0�oJ_��ۆ�7�XP��>m��k��F��@ sQs�7��vaT��]�s����vkO:�,gђ'�&�~����O��{/T�:�0��
���Q��Xl�S��Fed֏x�$%`����eг\9�>RBi��9K�kk������G������$/�l'M���'߇g.R�����x?�<�(d�Ro�,�5���¤;,��m��d~�
~�oڈ��~Y���[����Ǯ����J���Wb.6���M/���/U�QH��co�9��� ��as�:� *<��-�+�:�튌���(�h�
���1�iM�_��<�ʉj�Ε�����vd��F��o+���ē�-t	d�q��Bo�ɾ��ypkhH����h���%Bʯ���+��]����^_)Ǎ���P������=LW&����ε�&���� >h�)�f���)�*����=��)-��莤.=u�k�,�,�r��,s�Y���BV�J�ȲZq�_��-Um۰�D��%����9ZЖ��I@eyX���ة����C't�J�D�e��8D;��𖐁��ިG��#v4�_5sPN^�OZn��HX�~U�D���8���������3���p��(dx
e_h)��K����a���"��������a� �B �f�W�3'ǧ��x2=�?8�b�B�O�����Q�� �?�b�hO�{��6�}��i�n�00HfYH��Ri�8��3Uڤ�k�ՖB]���� Q��K��v�Z����&�]�}1n��x:�p�N_ ��.�����*d��!�4�Z�%�D�a���kTA�o�|{[7�^	��О4D��)۱'iߓ4ĳ@Ҽ2�H�<CF���/S���)����	�h��r�Q�=���f�]�U���j8Æ��p��$C��	s��J��H�?�F��3i<��6��u��{���g_��0x�pdGk�������q�X�<�!C%J.j\���_���G��%�o���������(�&�D�<����� ���\�z`���4�I4�5n]�=B�G����r���j�I�\�[_�~��Ztp	�M��h�j܍:�q���6�qóȰ �v<��m����gt3|��F�[�h W 	���.vڎ�D��*��x#������;���O;|EWR�	\����4��ඊ��4��%��Y�ѵq!=���gn���s�u<>L���7~��l��?zR;E�6�Fa�$��)�K_��TN�5�MbLq�3"I�́�̋P��v'�(����*{���`r�+�FS�⯗Z� ��A��xa�06E�`ZG����V/���8Lf�A�:a�$���[�[�ĩ.
��ĥ��}YM��� ��`<     