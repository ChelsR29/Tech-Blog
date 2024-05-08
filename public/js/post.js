const id = document.getElementById('post-id').getAttribute('value');

const commentFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();

    console.log('Comment:', comment);
    console.log('Post ID:', id);

    if (comment && id) { // Check if both comment and postId are present
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    content: comment,
                    post_id: id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Error: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        }
    } else {
        alert('Please enter a comment and ensure the post ID is present.');
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);




