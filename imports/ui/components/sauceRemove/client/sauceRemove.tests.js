import { name as SauceRemove } from '../sauceRemove';
import { Sauces } from '../../../../api/sauces';
import 'angular-mocks';

describe('SauceRemove', () => {

  beforeEach(() => {
    window.module(SauceRemove);
  });

  describe('controller', () => {
    let controller;
    const sauce = {
      _id: 'sauceId'
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(SauceRemove, {
          $scope: $rootScope.$new(true)
        }, {
          sauce
        });
      });
    });

    describe('remove()', () => {
      beforeEach(() => {
        spyOn(Sauces, 'remove');
        controller.remove();
      });

      it('should remove a sauce', () => {
        expect(Sauces.remove).toHaveBeenCalledWith(sauce._id);
      });
    });
  });
});