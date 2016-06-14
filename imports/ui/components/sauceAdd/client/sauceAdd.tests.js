import { name as SauceAdd } from '../sauceAdd';
import { Sauces } from '../../../../api/sauces';
import 'angular-mocks';
 
describe('SauceAdd', () => {
  beforeEach(() => {
    window.module(SauceAdd);
  });
 
  describe('controller', () => {
    let controller;
    const sauce = {
      name: 'Foo',
      description: 'Birthday of Foo'
    };
 
    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(SauceAdd, {
          $scope: $rootScope.$new(true)
        });
      });
    });
 
    describe('reset()', () => {
      it('should clean up sauce object', () => {
        controller.sauce = sauce;
        controller.reset();
 
        expect(controller.sauce).toEqual({});
      });
    });
 
    describe('submit()', () => {
      beforeEach(() => {
        spyOn(Sauces, 'insert');
        spyOn(controller, 'reset').and.callThrough();
 
        controller.sauce = sauce;
 
        controller.submit();
      });
 
      it('should insert a new sauce', () => {
        expect(Sauces.insert).toHaveBeenCalledWith(sauce);
      });
 
      it('should call reset()', () => {
        expect(controller.reset).toHaveBeenCalled();
      });
    });
  });
});