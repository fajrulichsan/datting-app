const { createClient } = require("@supabase/supabase-js");
const supabase = createClient('https://qaytugbcusqrhmaqwpsu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFheXR1Z2JjdXNxcmhtYXF3cHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5MjM2NjAsImV4cCI6MjAxOTQ5OTY2MH0.9WT7yoCXARLpZX2IBhLEIWuw4MsHrhvgz6m61omQxhE');

module.exports = supabase;