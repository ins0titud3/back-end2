function showEditForm(userId, username, password) {
  document.getElementById('editUserId').value = userId
  document.getElementById('editUsername').value = username
  document.getElementById('editPassword').value = password

  document.getElementById('editUserForm').style.display = 'block'
}

function cancelEdit() {
  document.getElementById('editUserForm').style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm')

  loginForm.addEventListener('submit', async event => {
    event.preventDefault()

    const formData = new FormData(loginForm)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        window.location.href = '/'
      } else {
        const data = await response.json()
        console.error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  })
})

document.querySelectorAll('[data-action="edit"]').forEach(button => {
  button.addEventListener('click', async () => {
    const userId = button.dataset.userId
    const newUsername = prompt('Enter new username:')
    const newPassword = prompt('Enter new password:')

    try {
      const response = await fetch('/editUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newUsername, newPassword }),
      })

      if (response.ok) {
        alert('User updated successfully')
        window.location.reload()
      } else {
        const data = await response.json()
        console.error(data.error)
        alert('Failed to update user')
      }
    } catch (error) {
      console.error(error)
      alert('Internal Server Error')
    }
  })
})

document.querySelectorAll('[data-action="delete"]').forEach(button => {
  button.addEventListener('click', async () => {
    const userId = button.dataset.userId

    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch('/deleteUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        if (response.ok) {
          alert('User deleted successfully')
          window.location.reload()
        } else {
          const data = await response.json()
          console.error(data.error)
          alert('Failed to delete user')
        }
      } catch (error) {
        console.error(error)
        alert('Internal Server Error')
      }
    }
  })
})

document.getElementById('addUserForm').addEventListener('submit', async event => {
  event.preventDefault()

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  try {
    const response = await fetch('/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (response.ok) {
      alert('User added successfully')
      window.location.reload()
    } else {
      const data = await response.json()
      console.error(data.error)
      alert('Failed to add user')
    }
  } catch (error) {
    console.error(error)
    alert('Internal Server Error')
  }
})
