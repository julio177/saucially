import { name as SauceDetails } from '../sauceDetails';
import { Sauces } from '../../../../api/parties';
import 'angular-mocks';

describe('SauceDetails', () => {
  beforeEach(() => {
    window.module(SauceDetails);
  });

  describe('controller', () => {
    let controller;
    const sauce = {
      _id: 'sauceId',
      name: 'Foo',
      description: 'Birthday of Foo',
      ingredients: 'Some ingredients',
      public: true
    };

     beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(SauceDetails, {
          $scope: $rootScope.$new(true)
        });
      });
    });

    describe('save()', () => {
      beforeEach(() => {
        spyOn(Sauces, 'update');
        controller.sauce = sauce;
        controller.save();
      });
 
      it('should update a proper sauce', () => {
        expect(Sauces.update.calls.mostRecent().args[0]).toEqual({
          _id: sauce._id
        });
      });

      it('should update with proper modifier', () => {
        expect(Sauces.update.calls.mostRecent().args[1]).toEqual({
          $set: {
            name: sauce.name,
            description: sauce.description,
            ingredients: sauce.ingredients,
            public: sauce.public
          }
        });
      });
    });
  });
});