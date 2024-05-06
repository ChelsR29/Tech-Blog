document.getElementById('toggle-new-post').addEventListener('change', function () {
  var form = document.getElementById('new-post-form');
  form.style.display = this.checked ? 'block' : 'none';
});

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const updateButtonHandler = async (event) => {
  event.preventDefault();

  const id = document.getElementById('edit-post-section').getAttribute('data-post-id');
  const title = document.querySelector('#edit-post-title').value.trim();
  const content = document.querySelector('#edit-post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

// Attach event listener to the update button within the edit form
document.getElementById('edit-post-form').addEventListener('submit', updateButtonHandler);




const delButtonHandler = async (event) => {
  event.preventDefault();
  
  if (event.target.classList.contains('btn-danger')) {
      const id = document.getElementById('edit-post-section').getAttribute('data-post-id');

      const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert('Failed to delete post');
      }
  }
};

// Attach event listener to the delete button within the edit form
document.getElementById('edit-post-form').addEventListener('click', delButtonHandler);


document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);


// Add click event listener to each post
document.querySelectorAll('.post').forEach(post => {
  post.addEventListener('click', () => {
      // Get the post's data attributes
      const postTitle = post.getAttribute('data-post-title');
      const postContent = post.getAttribute('data-post-content');

      // Populate the edit form with the post's data
      document.getElementById('edit-post-title').value = postTitle;
      document.getElementById('edit-post-content').value = postContent;

      // Set the post ID to the edit section
      document.getElementById('edit-post-section').setAttribute('data-post-id', post.getAttribute('data-post-id'));

      // Show the edit form
      document.getElementById('edit-post-section').style.display = 'block';
  });
});
