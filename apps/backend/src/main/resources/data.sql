INSERT INTO product (id, sku, price, description)
VALUES (DEFAULT, 'AAA001', 5.99, 'Standard Widget'),
       (DEFAULT, 'AAA002', 10.00, 'Advanced Widget'),
       (DEFAULT, 'BBB001', 0.69, 'Basic Gizmo');

INSERT INTO customer (id, name, house, street, city, postcode)
VALUES (DEFAULT, 'Buckingham Palace', 'Buckingham Palace', 'The Mall', 'London', 'SW1A 1AA'),
       (DEFAULT, '10 Downing Street', '10', 'Downing Street', 'London', 'SW1A 2AA'),
       (DEFAULT, 'The British Museum', 'The British Museum', 'Great Russell St', 'London', 'WC1B 3DG');

INSERT INTO customer_geolocation (customer_id, latitude, longitude)
SELECT id, 51.501383, -0.141855 FROM customer WHERE name = 'Buckingham Palace';

INSERT INTO customer_geolocation (customer_id, latitude, longitude)
SELECT id, 51.503389, -0.127631 FROM customer WHERE name = '10 Downing Street';

INSERT INTO customer_geolocation (customer_id, latitude, longitude)
SELECT id, 51.519542, -0.126871 FROM customer WHERE name = 'The British Museum';