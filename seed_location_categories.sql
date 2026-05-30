-- Seed location_categories junction table for TentCity v2
-- Maps locations to their categories using name lookups
-- Run this AFTER seed_locations.sql

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Avenue For Youth';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Hope Street';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 5 FROM locations l WHERE l.name = 'Hope Street';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Hope Street';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'The Bridge for Youth';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Avenues for Youth';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Avenues for Youth';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Harriet Tubman Center East';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'People Serving People St. Anne''s Place';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Mary''s Place';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 5 FROM locations l WHERE l.name = 'People Serving People';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'People Serving People';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'People Serving People';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'People Serving People';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'People Serving People';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Safe Bay';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Safe Bay';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Safe Bay';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Safe Bay';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Catholic Charities Higher Ground Minneapolis';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Catholic Charities Higher Ground Minneapolis';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Catholic Charities Higher Ground Minneapolis';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Agate Housing and Services Shelter at 510 S. 8th Street';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Our Saviour''s Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Our Saviour''s Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Our Saviour''s Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Our Saviour''s Shelter';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 5 FROM locations l WHERE l.name = 'Simpson Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Simpson Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Simpson Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Simpson Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Simpson Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 2 FROM locations l WHERE l.name = 'Simpson Shelter';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'First Covenant Church Shelter by Agate Housing and Services';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 9 FROM locations l WHERE l.name = 'First Covenant Church Shelter by Agate Housing and Services';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'First Covenant Church Shelter by Agate Housing and Services';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'First Covenant Church Shelter by Agate Housing and Services';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Avivo Village';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Avivo Village';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Avivo Village';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Avivo Village';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Women’s Only Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Women’s Only Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Women’s Only Shelter';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Women’s Only Shelter';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Sally''s Place';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Sally''s Place';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Sally''s Place';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Harbor Light Center - Sally''s Place';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Adult Shelter Connect';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Adult Shelter Connect';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Westminster Presbyterian Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Plymouth Congregational Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Hennepin Avenue Methodist Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'First Nations Kitchen (All Saints Episcopal Indian Mission)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salem Lutheran Church Community Meal';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Nokomis Heights Lutheran Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Mount Olivet Lutheran Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Hope Presbyterian Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Holy Rosary Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Great is Thy Faithfulness';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Loaves & Fishes - True Vine New Bethel';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Tasks Unlimited – Northeast Outreach & Opportunity Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Tasks Unlimited – Northeast Outreach & Opportunity Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Tasks Unlimited – Northeast Outreach & Opportunity Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Soup for You Cafe (Holy Trinity Lutheran Church)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 2 FROM locations l WHERE l.name = 'Peace House';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Peace House';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Loaves & Fishes - ICCM Life Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Central Lutheran Church Restoration Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Avivo';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'All God''s Children Metropolitan Community Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Agate Housing and Services Food Centre';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Catholic Charities Mary F. Frey Minneapolis Opportunity Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Catholic Charities Mary F. Frey Minneapolis Opportunity Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Catholic Charities Mary F. Frey Minneapolis Opportunity Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Catholic Charities Mary F. Frey Minneapolis Opportunity Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'SourceMN';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Senior Food Shelf';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Temple';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Temple';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Central';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Central';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 2 FROM locations l WHERE l.name = 'Pillsbury United Communities - Waite House';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Pillsbury United Communities - Waite House';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 2 FROM locations l WHERE l.name = 'Pillsbury United Communities - Oak Park';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Pillsbury United Communities - Oak Park';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 2 FROM locations l WHERE l.name = 'Pillsbury United Communities - Brian Coyle Community Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Pillsbury United Communities - Brian Coyle Community Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 5 FROM locations l WHERE l.name = 'NorthPoint Health & Wellness Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'NorthPoint Health & Wellness Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'New Creation Baptist Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Minneapolis First Seventh Day Adventist Church';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Living Hope Ministries';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Little Kitchen Food Shelf (Grace Lutheran Church)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Joyce Uptown Food Shelf, Inc.';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Harvest of the Heart Food Center (Cosecha del Corazon)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Groveland Emergency Food Shelf';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'GMCC (Greater Minneapolis Council of Churches)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Division of Indian Work';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Community Emergency Service';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Community Bridge Food Shelf';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'CAPI Culturally Specific Food Shelf';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'The Camden Promise';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'The Camden Collective';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Calvary Food Shelf';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Salvation Army Store - Nicollet Avenue South';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Salvation Army Store - North 4th Street';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'St. Vincent de Paul';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Old School by Steeple People';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Sharing and Caring Hands';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Sharing and Caring Hands';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 3 FROM locations l WHERE l.name = 'Sharing and Caring Hands';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Sharing and Caring Hands';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Sharing and Caring Hands';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Noble';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Noble';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Salvation Army Noble';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Parkview';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Salvation Army Parkview';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Parkview';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 6 FROM locations l WHERE l.name = 'Every Third Saturday (ets)';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Every Third Saturday (ets)';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Every Third Saturday (ets)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Salvation Army Parkview1';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Salvation Army Parkview1';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Salvation Army Parkview1';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 2 FROM locations l WHERE l.name = 'Sabathani Community Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Sabathani Community Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Sabathani Community Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 4 FROM locations l WHERE l.name = 'Marie Sandvik Center';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Marie Sandvik Center';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Cornerstone Ministry (Park Ave. United Methodist Church)';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 7 FROM locations l WHERE l.name = 'Central Lutheran Church Free Store';
INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 8 FROM locations l WHERE l.name = 'Central Lutheran Church Free Store';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 1 FROM locations l WHERE l.name = 'test 1000';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 1 FROM locations l WHERE l.name = 'GreenWay';

INSERT INTO location_categories (location_id, category_id)
SELECT l.id, 1 FROM locations l WHERE l.name = 'encamp_01';
