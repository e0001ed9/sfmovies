'use strict';

import sodaTransformer from '../src/soda_transformer.js';

describe('sodaTransformer', function () {

  describe('Given an empty list of movies', function () {

    it('returns an empty array', function () {
        const transformed = sodaTransformer([]);
        expect(transformed).toEqual([]);
      });
  });

  describe('Given a singleton list of movies', function () {

    it('returns the one movie', function () {
      const original = [ {
        'title' : '180',
        'actor_1' : 'Siddarth',
        'locations' : 'Epic Roasthouse (399 Embarcadero)',
        'release_year' : '2011',
        'production_company' : 'SPI Cinemas',
        'actor_2' : 'Nithya Menon',
        'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
        'director' : 'Jayendra',
        'actor_3' : 'Priya Anand'
      }];

      const transformed = sodaTransformer(original);
      expect(transformed).toEqual(original);
    });
  });

  describe('Given a list of movies with a duplicate', function () {

    it('returns the first instance of a movie with a given title', function () {
      const original = [ {
        'title' : '180',
        'actor_1' : 'Siddarth',
        'locations' : 'Epic Roasthouse (399 Embarcadero)',
        'release_year' : '2011',
        'production_company' : 'SPI Cinemas',
        'actor_2' : 'Nithya Menon',
        'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
        'director' : 'Jayendra',
        'actor_3' : 'Priya Anand'
      }, {
        'title' : '180',
        'actor_1' : 'Siddarth',
        'locations' : 'Mason & California Streets (Nob Hill)',
        'release_year' : '2011',
        'production_company' : 'SPI Cinemas',
        'actor_2' : 'Nithya Menon',
        'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
        'director' : 'Jayendra',
        'actor_3' : 'Priya Anand'
      }];

      const transformed = sodaTransformer(original);
      expect(transformed).toEqual(original.slice(0, 1));
    });
  });

  describe('Given a list of movies with a duplicate, but extra whitespace', function () {

    it('returns the first instance of a movie with a given title', function () {
      const original = [ {
        'title' : 'A Smile Like Yours',
        'actor_1' : 'Greg Kinnear',
        'locations' : '75 California Street',
        'release_year' : '1997',
        'production_company' : 'Paramount Pictures',
        'distributor' : 'Paramount Pictures',
        'actor_2' : 'Lauren Holly',
        'writer' : 'Keith Samples & Kevin Meyer',
        'director' : 'Keith Samples',
        'actor_3' : 'Joan Cusack'
      }
      , {
        'title' : 'A Smile Like Yours ',
        'actor_1' : 'Greg Kinnear',
        'locations' : 'Grace Cathedral Episcopal Church (1100 California Street)',
        'fun_facts' : 'Grace Cathedral Episcopal Church is the West Coast\'s largest Episcopalian cathedral.',
        'release_year' : '1997',
        'production_company' : 'Paramount Pictures',
        'distributor' : 'Paramount Pictures',
        'actor_2' : 'Lauren Holly',
        'writer' : 'Keith Samples & Kevin Meyer',
        'director' : 'Keith Samples',
        'actor_3' : 'Joan Cusack'
      }];

      const transformed = sodaTransformer(original);
      expect(transformed).toEqual(original.slice(0, 1));
    });
  });

  describe('Given a list of movies with a duplicate, both with extra whitespace', function () {

    it('returns the first instance of a movie with a given title', function () {
      const original = [ {
        'title' : 'Broken-A Modern Love Story ',
        'locations' : 'Ina Coolbrith Park (1700 Taylor Street)',
        'release_year' : '2010',
        'production_company' : 'RKW Films',
        'writer' : 'Ryan K. Whiting',
        'director' : 'Ryan K. Whiting'
      }
      , {
        'title' : 'Broken-A Modern Love Story ',
        'locations' : '0-100 block Halleck Street',
        'release_year' : '2010',
        'production_company' : 'RKW Films',
        'writer' : 'Ryan K. Whiting',
        'director' : 'Ryan K. Whiting'
      }];

      const transformed = sodaTransformer(original);
      expect(transformed).toEqual(original.slice(0, 1));
    });
  });

  describe('Given a list of movies with duplicates not adjacent', function () {

    it('returns the first instance of a movie with a given title', function () {
      const original = [ {
        'title' : '180',
        'actor_1' : 'Siddarth',
        'locations' : 'Epic Roasthouse (399 Embarcadero)',
        'release_year' : '2011',
        'production_company' : 'SPI Cinemas',
        'actor_2' : 'Nithya Menon',
        'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
        'director' : 'Jayendra',
        'actor_3' : 'Priya Anand'
      }, {
        'title': '48 Hours',
        'actor_1': 'Nick Nolte',
        'release_year': '1982',
        'production_company': 'Paramount Pictures',
        'distributor': 'Paramount Pictures',
        'actor_2': 'Eddie Murphy',
        'writer': 'Walter Hill',
        'director': 'Walter Hill'
      }, {
        'title' : '180',
        'actor_1' : 'Siddarth',
        'locations' : 'Mason & California Streets (Nob Hill)',
        'release_year' : '2011',
        'production_company' : 'SPI Cinemas',
        'actor_2' : 'Nithya Menon',
        'writer' : 'Umarji Anuradha, Jayendra, Aarthi Sriram, & Suba ',
        'director' : 'Jayendra',
        'actor_3' : 'Priya Anand'
      }];

      const transformed = sodaTransformer(original);
      expect(transformed).toEqual(original.slice(0, 2));
    });
  });
});
