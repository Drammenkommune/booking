import React from 'react'
import {ListItem, IconButton} from 'material-ui'
import RightIcon from 'material-ui/svg-icons/navigation/chevron-right'
import {Card} from '@/components'
import {Title} from '@/components/ListItem'
import {theme} from '@/services'

const functions = [{
  title: 'Bookingtidsperiode',
  href: 'bookingstidsperiode',
}, {
  title: 'Om tjenesten',
  href: 'om-tjenesten',
}, {
  title: 'Vilkår',
  href: 'vilkar',
}, {
  title: 'Rapporter/Statistikk',
  href: 'statistikk',
}]

const styles = {
  item: {
    paddingTop: 26,
    height: 78,
    borderBottom: `3px solid ${theme.bookingColor}`
  },
  button: {
    top: 11
  }
}

const Functions = () => {
  return (
    <Card title="Funksjoner" color={theme.bookingColor}>
      {functions.map((func, index) => (
        <ListItem
          key={index}
          href={`/superadmin/#/${func.href}`}
          primaryText={<Title title={func.title}/>}
          innerDivStyle={styles.item}
          rightIconButton={
            <IconButton aria-label={`Gå til ${func.title}`} style={styles.button}>
              <RightIcon/>
            </IconButton>
          }/>
      ))}
    </Card>
  )
}

export default Functions
