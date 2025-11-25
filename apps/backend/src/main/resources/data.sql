INSERT INTO product (id, sku, price, description)
VALUES (DEFAULT, 'AAA001', 5.99, 'Standard Widget'),
       (DEFAULT, 'AAA002', 10.00, 'Advanced Widget'),
       (DEFAULT, 'BBB001', 0.69, 'Basic Gizmo');

INSERT INTO customer (id, name, house, street, city, postcode, latitude, longitude)
VALUES (DEFAULT, 'Elizabeth Windsor', 'Buckingham Palace', 'The Mall', 'London', 'SW1A 1AA', 51.501383, -0.141855),
       (DEFAULT, 'James Carter', '10', 'Downing Street', 'London', 'SW1A 2AA', 51.503389, -0.127631),
       (DEFAULT, 'Sarah Mitchell', 'The British Museum', 'Great Russell St', 'London', 'WC1B 3DG', 51.519542, -0.126871);