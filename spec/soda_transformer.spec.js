'use strict';

import sodaTransformer from '../src/soda_transformer.js';

describe('sodaTransformer', function () {

  describe('Given an empty list of movies', function () {

    it('returns an empty array', function () {
        var transformed = sodaTransformer([]);
        expect(transformed).toEqual([]);
      });
  });

  describe('Given a singleton list of movies', function () {

    it('returns the one movie', function () {
      var original = [ {
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

      var transformed = sodaTransformer(original);
      expect(transformed).toEqual(original);
    });
  });

  describe('Given a list of movies with a duplicate', function () {

    it('returns the first instance of a movie with a given title', function () {
      var original = [ {
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

      var transformed = sodaTransformer(original);
      expect(transformed).toEqual(original.slice(0, 1));
    });
  });

  describe('Given a list of movies with duplicates not adjacent', function () {

    it('returns the first instance of a movie with a given title', function () {
      var original = [ {
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

      var transformed = sodaTransformer(original);
      expect(transformed).toEqual(original.slice(0, 2));
    });
  });
});
