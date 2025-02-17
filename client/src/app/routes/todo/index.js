import React, {Component} from 'react';
import {connect} from 'react-redux'
import Drawer from '@material-ui/core/Drawer';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import filters from './data/filters';
import labels from './data/labels';
import options from './data/options';
import ToDoList from 'app/routes/todo/components/ToDoList';
import ToDoDetail from 'app/routes/todo/components/ToDoDetail/index';
import AppModuleHeader from 'app/routes/todo/components/AppModuleHeader/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  fetchTodo,
  insertTodo,
  getAllTodo,
  getNavFilters,
  getNavLabels,
  getStarredToDo,
  getUnselectedAllTodo,
  getUnStarredTodo,
  handleToDoMenuRequestClose,
  hideToDoLoader,
  onDeleteToDo,
  onLabelMenuItemSelect,
  onLabelSelect,
  onLabelUpdate,
  onOptionMenuSelect,
  onSearchTodo,
  onSortEnd,
  onTodoAdd,
  onTodoChecked,
  onTodoSelect,
  onToDoUpdate,
  onTodoBatchUpdate,
  selectAllTodo,
  setCurrentToDoNull,
  toDoToggleDrawer,
  updateSearch
} from 'actions/ToDo';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import FormDialog from 'app/routes/todo/components/Dialog/FormDialog'


class ToDoWithRedux extends Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.onSortEnd({oldIndex, newIndex});
  };
  onLabelSelect = event => {
    this.props.onLabelSelect();
    this.setState({
      anchorEl: event.currentTarget,
    })
  };
  onOptionMenuSelect = event => {
    this.props.onOptionMenuSelect();
    this.setState({
      anchorEl: event.currentTarget,
    })
  };
  handleRequestClose = event => {
    this.props.handleToDoMenuRequestClose();
  };

  onOptionMenuItemSelect = (option) => {
    switch (option.title) {
      case 'All':
        this.props.handleToDoMenuRequestClose();
        this.props.selectAllTodo();
        break;
      case 'None':
        this.props.handleToDoMenuRequestClose();
        this.props.getUnselectedAllTodo();
        break;
      case 'Starred':
        this.props.handleToDoMenuRequestClose();
        this.props.getStarredToDo();
        break;
      case 'Unstarred':
        this.props.handleToDoMenuRequestClose();
        this.props.getUnStarredTodo();
        break;
      default:
        this.props.handleToDoMenuRequestClose();
        this.props.selectAllTodo();
    }
  };
  onLabelMenuItemSelect = (label) => {
    this.props.handleToDoMenuRequestClose();
    this.props.onLabelMenuItemSelect(label);

  };
  onLabelUpdate = (data, label) => {
    this.props.handleToDoMenuRequestClose();
    this.props.onLabelUpdate({data, label});
  };
  onToDoUpdate = (data) => {
    this.props.handleToDoMenuRequestClose();
    this.props.onToDoUpdate(data);
  };
  onTodoBatchUpdate = (data) => {
    this.props.handleToDoMenuRequestClose();
    this.props.onTodoBatchUpdate(data);
  };


  onDeleteToDo = (data) => {
    this.props.onDeleteToDo(data);
  };

  onSearchTodo = (searchText) => {
    this.props.onSearchTodo(searchText);
  };

  onTodoChecked = (data) => {
    this.props.onTodoChecked(data);
  };

  onAllTodoSelect = () => {
    const selectAll = this.props.selectedToDos < this.props.toDos.length;
    if (selectAll) {
      this.props.selectAllTodo();
    } else {
      this.props.getUnselectedAllTodo();
    }
  };

  onTodoAdd = (data) => {
    //this.props.onTodoAdd(data);
    this.props.insertTodo(data);
  };

  onTodoSelect = (todo) => {
    this.props.onTodoSelect(todo);
    // setTimeout(() => {
    //   this.props.hideToDoLoader();
    // }, 1500);
  };

  removeLabel = (todo, label) => {
    todo.labels.splice(todo.labels.indexOf(label), 1);
    return todo.labels;
  };

  addLabel = (todo, label) => {
    todo.labels = todo.labels.concat(label);
    return todo.labels
  };

  onToggleDrawer = () => {
    this.props.toDoToggleDrawer();
  };

  updateSearch = (evt) => {
    this.props.updateSearch(evt.target.value);
    this.onSearchTodo(evt.target.value)
  };
  getNavFilters = () => {
    return filters.map((filter, index) =>
      <li key={index} onClick={() => {
        this.props.getNavFilters(filter);
        setTimeout(() => {
          this.props.hideToDoLoader();
        }, 1500);
      }
      }>
        <span className={`jr-link ${filter.id === this.props.selectedSectionId ? 'active' : ''}`}>
          <i className={`zmdi zmdi-${filter.icon}`}/>
          <span>{filter.title}</span>
        </span>
      </li>
    )
  };
  getNavLabels = () => {
    return labels.map((label, index) =>
      <li key={index} onClick={() => {
        this.props.getNavLabels(label);
        setTimeout(() => {
          this.props.hideToDoLoader();
        }, 1500);
      }
      }>
        <span className="jr-link">
          <i className={`zmdi zmdi-circle text-${label.color}`}/>
          <span>{label.title}</span>
        </span>
      </li>
    )
  };
  ToDoSideBar = () => {
    return <div className="module-side">
      <div className="module-side-header">
        <div className="module-logo">
          <i className="zmdi zmdi-email mr-4"/>
          <span><IntlMessages id="sidebar.appModule.toDo"/></span>
        </div>

      </div>
      <div className="module-side-content scrollbar">
        <CustomScrollbars className="module-side-scroll scrollbar"
                          style={{height: this.props.width >= 1200 ? 'calc(100vh - 200px)' : 'calc(100vh - 80px)'}}>
          <div className="module-add-task">
            <FormDialog onSubmit={this.onTodoAdd}/>
          </div>
          <ul className="module-nav">

            <li onClick={() => {
              this.props.getAllTodo();
            }
            }>
              <span className="jr-link">
                <i className="zmdi zmdi-menu"/>
                <span><IntlMessages id="todo.all"/></span>
              </span>
            </li>

            <li className="module-nav-label">
              <IntlMessages id="todo.filters"/>
            </li>

            {this.getNavFilters()}

            <li className="module-nav-label">
              <IntlMessages id="todo.labels"/>
            </li>

            {this.getNavLabels()}

          </ul>
        </CustomScrollbars>
      </div>
    </div>
  };
  showToDos = ({currentTodo, toDos}) => {
    return currentTodo === null ?
      <ToDoList toDos={toDos} onSortEnd={this.onSortEnd}
                onTodoSelect={this.onTodoSelect.bind(this)}
                width={this.props.width}
                onTodoBatchUpdate={this.onTodoBatchUpdate.bind(this)}
                onTodoChecked={this.onTodoChecked.bind(this)} useDragHandle={true}/>
      :
      <ToDoDetail todo={currentTodo} 
                  onLabelUpdate={this.onLabelUpdate.bind(this)}
                  width={this.props.width}
                  onTodoBatchUpdate={this.onTodoBatchUpdate.bind(this)}
                  onDeleteToDo={this.onDeleteToDo.bind(this)}/>;
  };

  constructor() {
    super();
    this.state = {
      anchorEl: null
    }
  }

  componentWillMount() {
    this.props.fetchTodo();
  }

  render() {
    const {selectedToDos, loader, toDos, alertMessage, showMessage} = this.props;

    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="app-module">
            <div className="d-block d-xl-none">
              <Drawer
                open={this.props.drawerState}
                onClose={this.onToggleDrawer.bind(this)}>
                {this.ToDoSideBar()}
              </Drawer>
            </div>
            <div className="app-module-sidenav d-none d-xl-flex">
              {this.ToDoSideBar()}
            </div>

            <div className="module-box">
              <div className="module-box-header">

                <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu"
                            onClick={this.onToggleDrawer.bind(this)}>
                  <i className="zmdi zmdi-menu"/>
                </IconButton>
                <AppModuleHeader placeholder="Search To Do" 
                                 onChange={this.updateSearch.bind(this)}
                                 value={this.props.searchTodo}/>
              </div>
              <div className="module-box-content">
                {this.props.currentTodo === null ?
                  <div className="module-box-topbar module-box-topbar-todo d-flex flex-row">
                    <Checkbox color="primary"
                              indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}
                              checked={selectedToDos > 0}
                              onChange={this.onAllTodoSelect.bind(this)}
                              value="SelectMail"/>

                    <div className="d-flex align-items-center" onClick={this.onOptionMenuSelect.bind(this)}>
                      <span className="px-2"> {this.props.optionName}</span>
                      <IconButton className="icon-btn-sm">
                        <i className="zmdi zmdi-caret-down"/>
                      </IconButton>
                    </div>

                    {(selectedToDos > 0) &&
                    <IconButton className="icon-btn"
                                onClick={this.onLabelSelect.bind(this)}>
                      <i className="zmdi zmdi-label-alt"/>
                    </IconButton>}
                  </div>
                  :
                  <div className="module-box-topbar">
                    <IconButton className="icon-btn"
                                onClick={() => {
                                  this.props.setCurrentToDoNull();
                                }}>
                      <i className="zmdi zmdi-arrow-back"/>
                    </IconButton>
                  </div>
                }


                <Menu id="option-menu"
                      anchorEl={this.state.anchorEl}
                      open={this.props.optionMenuState}
                      onClose={this.props.handleToDoMenuRequestClose}
                      MenuListProps={{
                        style: {
                          width: 150,
                        },
                      }}>
                  {options.map(option =>
                    <MenuItem key={option.title}
                              onClick={this.onOptionMenuItemSelect.bind(this, option)}>
                      {option.title}
                    </MenuItem>,
                  )}
                </Menu>

                <Menu id="label-menu"
                      anchorEl={this.state.anchorEl}
                      open={this.props.labelMenuState}
                      onClose={this.props.handleToDoMenuRequestClose}
                      MenuListProps={{
                        style: {
                          width: 150,
                        },
                      }}>
                  {labels.map(label =>
                    <MenuItem key={label.id}
                              onClick={this.onLabelMenuItemSelect.bind(this, label)}>
                      {label.title}
                    </MenuItem>,
                  )}
                </Menu>

                {loader ?
                  <div className="loader-view"
                       style={{height: this.props.width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 238px)'}}>
                    <CircularProgress/>
                  </div> :
                  this.showToDos(this.props)
                }
              </div>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={showMessage}
            autoHideDuration={3000}
            onClose={this.handleRequestClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{alertMessage}</span>}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({toDo, settings}) => {
  const {width} = settings;
  const {
    searchTodo,
    alertMessage,
    loader,
    showMessage,
    drawerState,
    allToDos,
    optionName,
    currentTodo,
    selectedToDos,
    labelMenuState,
    optionMenuState,
    toDos,
    filter,
  } = toDo;
  
  return {
    width,
    searchTodo,
    alertMessage,
    loader,
    showMessage,
    drawerState,
    allToDos,
    optionName,
    currentTodo,
    selectedToDos,
    labelMenuState,
    optionMenuState,
    toDos,
    filter,
  }
};


export default connect(mapStateToProps, {
  getAllTodo,
  fetchTodo,
  insertTodo,
  getNavFilters,
  getNavLabels,
  getStarredToDo,
  getUnselectedAllTodo,
  getUnStarredTodo,
  handleToDoMenuRequestClose,
  hideToDoLoader,
  onDeleteToDo,
  onLabelMenuItemSelect,
  onLabelSelect,
  onLabelUpdate,
  onOptionMenuSelect,
  onSearchTodo,
  onSortEnd,
  onTodoAdd,
  onTodoChecked,
  onTodoSelect,
  onToDoUpdate,
  selectAllTodo,
  setCurrentToDoNull,
  toDoToggleDrawer,
  updateSearch,
  onTodoBatchUpdate
})(ToDoWithRedux);