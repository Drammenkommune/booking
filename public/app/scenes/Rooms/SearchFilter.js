import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {GridContainer} from '@/components'
import {roomTypes, alphabeticSort} from '@/services'

const styles = StyleSheet.create({
  label: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  lastLabel: {
    '@media (max-width: 759px)': {
      marginTop: 16
    }
  },
  labelText: {
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 8
  },
  select: {
    width: '100%',
    borderRadius: 3,
    border: '1px solid #2C3F4E',
    fontSize: 18,
    paddingLeft: 16
  },
  border: {
    border: 'none',
    borderBottom: '3px solid #D2D2D2',
    maxWidth: 480,
    '@media (min-width: 760px)': {
      maxWidth: 960,
      width: 'calc(100% - 40px)'
    },
    '@media (min-width: 990px)': {
      maxWidth: 960,
      width: 'calc(100% - 60px)'
    },
    '@media (min-width: 1480px)': {
      maxWidth: 1280
    }
  }
})

class SearchFilter extends React.Component {

  constructor(props) {
    super(props)
    this.onUpdateOwner = ::this.onUpdateOwner
    this.onUpdateRoomType = ::this.onUpdateRoomType
  }

  onUpdateOwner(event) {
    const ownerId = event.target.value
    this.props.onHandleOwnerFilter(ownerId)
  }

  onUpdateRoomType(event) {
    const roomType = event.target.value
    this.props.onHandleRoomTypeFilter(roomType)
  }

  render() {
    const {owners} = this.props

    return owners && owners.length > 0
      ? (
        <div>
          <GridContainer>
            <div>
              <label className={css(styles.label)}>
                <span className={css(styles.labelText)}>Velg skole</span>
                <select className={css(styles.select)} onChange={this.onUpdateOwner}>
                  <option value="null">Vis alle</option>
                  {alphabeticSort(owners, 'name').map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className={css(styles.label, styles.lastLabel)}>
                <span className={css(styles.labelText)}>Velg type lokale</span>
                <select className={css(styles.select)} onChange={this.onUpdateRoomType}>
                  <option value="null">Vis alle</option>
                  {Object.keys(roomTypes).map(key => (
                    <option key={key} value={key}>{roomTypes[key]}</option>
                  ))}
                </select>
              </label>
            </div>
          </GridContainer>
          <hr className={css(styles.border)}/>
        </div>
      )
      : null
  }
}

SearchFilter.propTypes = {
  owners: React.PropTypes.array,
  onHandleOwnerFilter: React.PropTypes.func.isRequired,
  onHandleRoomTypeFilter: React.PropTypes.func.isRequired
}

export default SearchFilter
