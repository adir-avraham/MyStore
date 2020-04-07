FROM mongo:4.2.3


COPY *.json /

CMD mongoimport --host database --db MyStore --collection users --type json --file /users.json --jsonArray && mongoimport --host database --db MyStore --collection categories --type json --file /categories.json --jsonArray && mongoimport --host database --db MyStore --collection products --type json --file /products.json --jsonArray