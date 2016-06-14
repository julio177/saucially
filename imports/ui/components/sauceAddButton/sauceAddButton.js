import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import buttonTemplate from './sauceAddButton.html';
import modalTemplate from './sauceAddModal.html';
import { name as SauceAdd } from '../sauceAdd/sauceAdd';
 
class SauceAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';
 
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
  }
 
  open(event) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';
 
        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'sauceAddModal',
      template: modalTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}
 
const name = 'sauceAddButton';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  SauceAdd
]).component(name, {
  template: buttonTemplate,
  controllerAs: name,
  controller: SauceAddButton
});