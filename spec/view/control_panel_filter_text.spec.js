import FilterText from '../../src/view/control_panel_filter_text';
import React from 'react/addons';

const { renderIntoDocument, Simulate } = React.addons.TestUtils;

describe('FilterText', () => {
  const onFilterTextChanged = jasmine.createSpy();
  const filterText = renderIntoDocument(
    <FilterText onFilterTextChanged={onFilterTextChanged}/>
  );
  const domNode = React.findDOMNode(filterText);
  const textInput = domNode.querySelector('input[type=text]');

  const simulate = (text) => {
    return Simulate.change(textInput, { target: { value: text }});
  };

  describe('when trimmed text is entered', () => {
    const text = 'trim and tidy';
    beforeEach(() => simulate(text));

    it('calls onFilterTextChanged the exact text', () => {
      expect(onFilterTextChanged).toHaveBeenCalledWith(text);
    });

    it('leaves the text as the exact text', () => {
      expect(textInput.value).toEqual(text);
    });
  });

  describe('when untrimmed text is entered', () => {
    const text = 'i was about to say something ';
    beforeEach(() => simulate(text));

    it('calls onFilterTextChanged the trimmed text', () => {
      expect(onFilterTextChanged).toHaveBeenCalledWith(text.trim());
    });

    it('leaves the text as the exact text', () => {
      expect(textInput.value).toEqual(text);
    });
  });
});
