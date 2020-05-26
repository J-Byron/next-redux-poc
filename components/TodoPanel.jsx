import { useState } from 'react'
import { useSelector, connect } from 'react-redux'

// *---------* Material UI *---------*
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import TextField from '@material-ui/core/TextField'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddBoxIcon from '@material-ui/icons/AddBox'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles(theme => ({
  table: {
    maxWidth: 650
  },
  root: {
    marginTop: '12px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

/*
  Next JS supports 3 types of pages
  1. Static generation (think pages that can be loaded before a user's request, like a blog post )
  2. SSR that fetches data once at request time. 
  3. client side generation (look into SWR)
*/

const TodoPanel = props => {
  const { list, dispatch } = props

  const classes = useStyles()
  const [description, setDescription] = useState('')
  const [isEditingItem, setIsEditingItem] = useState(false)
  const [editingItem, setEditingItem] = useState(0)
  const [editItemDescription, setEditItemDescription] = useState('')

  const handleAddClick = () => {
    setDescription('')
    dispatch({ type: 'POST_TODO', payload: { description } })
  }

  const handleDeleteClick = id => {
    dispatch({ type: 'DELETE_TODO', payload: { id: id } })
  }

  const handleEditClick = async id => {
    setIsEditingItem(false)
    await dispatch({
      type: 'UPDATE_TODO',
      payload: { id: id, updatedDescription: editItemDescription }
    })
  }

  return (
    <>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#648dff', color: 'white' }}>
              <TableCell style={{ color: 'white' }} align='center'>
                Description
              </TableCell>
              <TableCell style={{ color: 'white' }} align='center'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell
                  style={{ maxWidth: '184px' }}
                  component='th'
                  scope='row'
                  align='center'
                >
                  {isEditingItem && editingItem == index ? (
                    <TextField
                      variant='outlined'
                      placeholder={item.description}
                      onChange={({ target }) => {
                        setEditItemDescription(target.value)
                      }}
                    />
                  ) : (
                    item.description
                  )}
                </TableCell>
                <TableCell component='th' scope='row' align='center'>
                  {isEditingItem && editingItem == index ? (
                    <>
                      <IconButton onClick={() => setIsEditingItem(false)}>
                        <CancelIcon color='secondary' />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(item._id)}>
                        <CheckBoxIcon color='primary' />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        <DeleteIcon color='secondary' />
                      </IconButton>
                      <IconButton
                        aria-label='edit'
                        onClick={() => {
                          setIsEditingItem(true)
                          setEditingItem(index)
                        }}
                      >
                        <EditIcon color='primary' />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='add item'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <IconButton
          className={classes.iconButton}
          aria-label='add'
          onClick={() => handleAddClick()}
        >
          <AddBoxIcon style={{ fill: '#648dff' }} fontSize='large' />
        </IconButton>
      </Paper>
    </>
  )
}

export default connect()(TodoPanel)
