import { name as SaucesSort } from '../saucesSort';
import 'angular-mocks';

describe('SaucesSort', () => {
  beforeEach(() => {
    window.module(SaucesSort);
  });

  describe('controller', () => {
    let controller;
    const onChange = function() {};
    const property = 'name';
    const order = -1;

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(SaucesSort, {
          $scope: $rootScope.$new(true)
        }, {
          onChange,
          property,
          order
        });
      });
    });

    it('should set property', () => {
      expect(controller.property).toEqual(property);
    });

    it('should set order', () => {
      expect(controller.order).toEqual(order);
    });
 
    it('should set onChange', () => {
      expect(controller.onChange).toBe(onChange);
    });

    describe('changed()', () => {
      it('should call onChange expression', () => {
        spyOn(controller, 'onChange');
 
        controller.changed();

        expect(controller.onChange).toHaveBeenCalledWith({
          sort: {
            [property]: order
          }
        });
      });
    });
  });
});