import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Log } from "../middleware/logger";
import { saveShortUrl } from "../utils/storage";

interface ShortUrl {
  longUrl: string;
  shortCode: string;
  expiry: string;
  createdAt: string;
}

const defaultValidity = 30; 

const ShortenerForm: React.FC<{ token: string }> = ({ token }) => {
  const [inputs, setInputs] = useState([
    { longUrl: "", validity: "", shortCode: "" },
    // ...reeat up t 5
  ]);
  const [results, setResults] = useState<ShortUrl[]>([]);
  const [error, setError] = useState("");

    type InputField = "longUrl" | "validity" | "shortCode";

    const handleChange = (idx: number, field: InputField, value: string) => {
    const updated = [...inputs];
    updated[idx][field] = value;
    setInputs(updated);
    };


  const validateUrl = (url: string) => { // valida comndt
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    setError("");
    for (let i = 0; i < inputs.length; i++) {
      const { longUrl, validity, shortCode } = inputs[i];
      if (!longUrl || !validateUrl(longUrl)) {
        setError("Invalid URL " + (i + 1));
        await Log("frontend", "error", "component", "Invalid URL entered", token);
        return;
      }
      if (validity && isNaN(Number(validity))) {
        setError("Validity must be a number at row " + (i + 1));
        await Log("frontend", "warn", "component", "Non-numeric validity", token);
        return;
      }
      // Chek for duplicate shortcoes if providd
      if (shortCode && inputs.some((inp, j) => inp.shortCode === shortCode && i !== j)) {
        setError("Duplicate shortcode at row " + (i + 1));
        await Log("frontend", "warn", "component", "Shortcode collision", token);
        return;
      }
    }

    // Generte shrt RLs (smulte, as no bakend)
    const now = new Date();
    const newResults: ShortUrl[] = inputs.map((input) => {
      const expiry = input.validity ? Number(input.validity) : defaultValidity;
      const code = input.shortCode || Math.random().toString(36).slice(2, 8);
      return {
        longUrl: input.longUrl,
        shortCode: code,
        expiry: new Date(now.getTime() + expiry * 60000).toISOString(),
        createdAt: now.toISOString(),
      };
    });
    setResults(newResults);
    saveShortUrl(newResults); // perst
    await Log("frontend", "info", "component", "Short URLs created", token);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 4 }}>
    <Box>
      <Typography variant="h6">Shorten up to 5 URLs</Typography>
      {inputs.map((input, idx) => (
        <Box key={idx} display="flex" gap={2} mb={1}>
          <TextField label="Long URL" value={input.longUrl} onChange={e => handleChange(idx, "longUrl", e.target.value)} />
          <TextField label="Validity (min)" value={input.validity} onChange={e => handleChange(idx, "validity", e.target.value)} />
          <TextField label="Custom Shortcode" value={input.shortCode} onChange={e => handleChange(idx, "shortCode", e.target.value)} />
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
      {error && <Typography color="error">{error}</Typography>}
      <Box mt={2}>
        {results.map((res, idx) => (
          <Box key={idx}>
            <Typography>Short URL: http://localhost:3000/{res.shortCode} (expires: {res.expiry})</Typography>
          </Box>
        ))}
      </Box>
    </Box>
    </Paper>
  );
};

export default ShortenerForm;
