import ShowNoPoster from '../../src/view/control_panel_show_no_poster';
import React from 'react/addons';

const { renderIntoDocument, Simulate } = React.addons.TestUtils;

describe('ShowNoPoster', () => {
  const onShowNoPoster = jasmine.createSpy();
  const showNoPoster = renderIntoDocument(
    <ShowNoPoster onShowNoPoster={onShowNoPoster}/>
  );
  const domNode = React.findDOMNode(showNoPoster);
  const checkbox = domNode.querySelector('input[type=checkbox]');

  describe('when initially rendered', () => {
    it('sets the checkbox to checked', () => {
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('when unchecked', () => {
    it('call onShowNoPoster with false', () => {
      Simulate.change(checkbox, { target: { checked: false }});
      expect(onShowNoPoster).toHaveBeenCalledWith(false);
    });
  });

  describe('when checked', () => {
    it('call onShowNoPoster with true', () => {
      Simulate.change(checkbox, { target: { checked: true }});
      expect(onShowNoPoster).toHaveBeenCalledWith(true);
    });
  });
});
