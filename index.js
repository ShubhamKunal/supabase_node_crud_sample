const express = require('express');
const supabase = require('./supabase_client');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json()); 
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(data);
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const { data, error } = await supabase
    .from('users')
    .update({ name, email })
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send(); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
