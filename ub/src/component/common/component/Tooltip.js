/* eslint-disable react/jsx-no-bind */
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Tooltip as Tooltips} from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';

function Tooltip(props) {
    const {title, children} = props
  const renderTooltip = (props) => (
    <Tooltips id="button-tooltip" {...props}>
      {title.toString()}
    </Tooltips>
  );
  const onClick = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    props?.onClick(e)
  }
  return (
    <OverlayTrigger
      overlay={renderTooltip}
      placement="top"
    >
      <label className={props?.className} onClick={onClick}>
        {children}
      </label>
    </OverlayTrigger>
  );
}

export default Tooltip;