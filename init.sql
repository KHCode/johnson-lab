CREATE TABLE [IF NOT EXISTS] members (
    ID SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    title VARCHAR(255),
    currentMem BOOLEAN,
    credentials TEXT,
    bio TEXT,
);

INSERT INTO members (name, image, title, currentMem, credentials, bio)
VALUES ('Dr. Colin Johnson',
        '/images/Johnson Base Final.jpg',
        'Principle Investigator',
        true,
        'Ph.D 2005 - University of Illinois, Urbana Champaign; Postdoc 2005-2007 - University of Pennsylvania; Postdoc 2007-2011 - University of Wisconsin, Madison',
        'Colin is a fan of running, comics, cycling, and beans.');