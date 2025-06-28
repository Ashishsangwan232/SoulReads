import React from 'react'
import './userprofile.css';

const UserProfile = () => {
  return (
    <div className='userprofile-container'>
      <div className='userprofile-card'>
        <div className='userprofile-close-btn'>
          <span className="material-symbols-outlined">
            close
          </span>
        </div>
        <div className='userprofile-details'>
          <div className='userprofile-name'>
            <p>Ashish</p>
            <h5>Student</h5>
          </div>
          <img src="/avatar/Doremon.webp" alt="image" />
        </div>
        <div className='userprofile-other-details'>
          <h5>ashishsangwan26790@gmail.com</h5>
        </div>
        <div className='userprofile-table'>
          <table>
            <tr>
              <th>Posts</th>
              <th>Likes</th>
            </tr>
            <tr>
              <td>12</td>
              <td>300</td>
            </tr>
          </table>
        </div>
        <div className='userprofile-footer'>
          <p>SoulReads</p>
        </div>

      </div>
    </div>
  )
}

export default UserProfile