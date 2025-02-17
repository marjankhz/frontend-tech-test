import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import SearchBox from 'app/routes/todo/components/SearchBox';


class AppModuleHeader extends React.Component {

  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    })
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      popoverOpen: false
    };
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const {placeholder, onChange, value} = this.props;

    return (
      <div className="module-box-header-inner">
        <div className="search-bar right-side-icon bg-transparent d-none d-sm-block">
          <div className="form-group">
            <input className="form-control border-0" type="search" placeholder={placeholder}
                   onChange={onChange}
                   value={value}/>
            <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
          </div>
        </div>


        <div className="d-inline-block d-sm-none">
          <Dropdown
            className="quick-menu nav-searchbox"
            isOpen={this.state.searchBox}
            toggle={this.onSearchBoxSelect.bind(this)}>

            <DropdownToggle
              className="d-inline-block"
              tag="span"
              data-toggle="dropdown">
              <IconButton className="icon-btn">
                <i className="zmdi zmdi-search zmdi-hc-fw text-grey"/>
              </IconButton>
            </DropdownToggle>

            <DropdownMenu className="p-0">
              <SearchBox styleName="search-dropdown" placeholder=""
                         onChange={onChange}
                         value={value}/>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default AppModuleHeader;

AppModuleHeader.defaultProps = {
  styleName: '',
  value: '',
  notification: true,
  apps: true
};