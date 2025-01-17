<script>
    let username = '';
    let password = '';
    let error = '';
  
    const login = async () => {
      try {
        const response = await fetch('http://localhost:8000/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();
        if (data.token) {
          // Handle successful login (store token, redirect, etc.)
        } else {
          error = 'Invalid credentials';
        }
      } catch (err) {
        error = 'Something went wrong';
      }
    };
  </script>
  
  <div>
    <h2>Login</h2>
    {#if error}
      <p style="color: red;">{error}</p>
    {/if}
    <input type="text" bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={login}>Login</button>
  </div>
  