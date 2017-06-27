import React from 'react'
import {css, StyleSheet} from 'aphrodite'
import {Card, IconButton} from 'material-ui'
import PeopleIcon from 'material-ui/svg-icons/social/group'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import {BoldText, Content, PaddedButton, RoomImage} from '@/components'
import {theme, roomTypes, facilityEnum, formatNewLines} from '@/services'
import {SquareSizeIcon, PicturePlaceholder} from '@/icons'

const cssStyles = StyleSheet.create({
  container: {
    maxWidth: 960,
    width: '100%',
    '@media (min-width: 1480px)': {
      maxWidth: 1280
    }
  }
})

const styles = {
  listItem: {
    width: '100%',
    marginTop: 16,
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  listItemContent: {
    display: 'flex',
    alignItems: 'center'
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  peopleSizeStyle: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    marginRight: 10
  },
  image: {
    width: 'calc(33% - 10px)',
    height: 'calc(33vw - 45px)',
    marginLeft: 10,
    maxWidth: 150,
    maxHeight: 150,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

class ListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpand = ::this.toggleExpand
  }

  toggleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {room, onHandleBooking} = this.props
    const {expanded} = this.state

    return (
      <div className={css(cssStyles.container)}>
        <Card style={styles.listItem} onTouchTap={this.toggleExpand}>
          <Content style={styles.listItemContent}>
            <div style={styles.nameContainer}>
              <BoldText>{room.ownerName}</BoldText>
              <span>{room.name} ({roomTypes[room.type]})</span>
            </div>
            <span style={{flex: 1}}></span>
            {room.facilities.map(facility => {
              const Icon = facilityEnum.icons[facility]
              return (
                <span key={facility} title={facilityEnum[facility]}>
                  <Icon key={facility} style={{marginRight: 16}}/>
                </span>
              )
            })}
            <p title="Personer" style={styles.peopleSizeStyle}>
              <PeopleIcon style={{marginRight: 10}} />
              {room.maxPeople} pers.
            </p>
            {room.size && (
              <p title="Kvadratmeter" style={styles.peopleSizeStyle}>
                <SquareSizeIcon style={{marginRight: 10, height: 24, width: 24}} />
                {room.size} kvm.
              </p>
            )}
            <PaddedButton
              label="Book"
              onTouchTap={(e) => { e.stopPropagation(); onHandleBooking(room) }}
              backgroundColor={theme.roomColor}/>
            <IconButton
              aria-label={expanded ? 'Kollaps' : 'Ekspander'}
              onTouchTap={this.toggleExpand}
              style={{transform: expanded ? 'rotate(-180deg)' : 'rotate(0deg)'}}>
              <DownArrow />
            </IconButton>
          </Content>
          {expanded && (
            <Content style={{paddingTop: 0, zIndex: 1}}>
              <hr style={{border: 0, margin: '0 0 16px 0', borderTop: '1px solid #D2D2D2'}}/>
              <div style={{display: 'flex'}}>
                <div style={{width: '50%'}}>
                  <h4>Viktig informasjon</h4>
                  <p>{formatNewLines(room.info)}</p>
                  <h4>Skolens kontaktinfo</h4>
                  <p>{room.contact.name}, {room.contact.phoneNumber}</p>
                </div>
                <div style={{width: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                  {room.images.map((image) => (
                    <RoomImage key={image.id} thumbnailUrl={image.thumbnail} imageUrl={image.url} style={styles.image}/>
                  ))}
                  {room.images.length === 0 && (
                    <div style={{width: 'calc(33% - 10px)'}}>
                      <PicturePlaceholder />
                    </div>
                  )}
                </div>
              </div>
            </Content>
          )}
        </Card>
      </div>
    )
  }
}

ListItem.propTypes = {
  room: React.PropTypes.object.isRequired,
  onHandleBooking: React.PropTypes.func.isRequired
}

export default ListItem
