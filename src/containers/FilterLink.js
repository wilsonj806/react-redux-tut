import Link from '../components/Link';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';

/** NOTE
 * The FilterLink component as mentioned by the read-redux-basics.md file, needs a callback for when it's clicked
 *  and it needs to present a filter option that corresponds
 *  with the equivalent option in the Redux Store
 *
 * Also note how we pass the ownProps argument in each of below functions
 *
 * This lets us use any props that Redux should be aware of in order to retrieve
 *  the necessary data from the Redux store
 */

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.setVisibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

export const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);