import * as React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import TrussDiagramW from "./TrussDiagramW";
import TrussDiagramH from "./TrussDiagramH";
import TrussDiagramP from "./TrussDiagramP";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Forces, Reaction, ReactionForce } from "./Calculation/ReactionForce";


export const Truss_screen = () => {
  const [trussHeight, setTrussHeight] = React.useState(100);
  const [trussSpan, setTrussSpan] = React.useState(500);
  const [trussType, setTrussType] = React.useState("pratt");

  // Force state for multiple nodes
  const [forces, setForces] = React.useState([
    { node: 0, fx: 0, fy: 0 },
    { node: 7, fx: 0, fy: 0 },
  ]);
 

  const [ReactionForces, setReactionForces] = React.useState<Reaction | null>(null);

  // Handle numeric input changes safely with scaling
  const handleNumericChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value > 0) setter(value * 10); // Scale input by 10
    };

  const handleTrussTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrussType(e.target.value);
  };

  // Handle force input changes safely
  const updateForce = (index: number, key: "node" | "fx" | "fy", value: number) => {
    setForces((prevForces) =>
      prevForces.map((force, i) => (i === index ? { ...force, [key]: value || 0 } : force))
    );
  };

  // Add a new force entry
  const addForce = () => {
    setForces([...forces, { node: 0, fx: 0, fy: 0 }]);
  };
 
  function calculateReactionForces(): void {
    const Rforces: Forces[] = forces.map((force) => ({
      direction: "y", // Assuming vertical reaction force calculation
      magnitude: force.fy,
      node: force.node,
      distanceFromZero: (force.node / 5) * trussSpan, // Assuming 5 segments in the truss
    }));
  
    const reaction = ReactionForce(Rforces, trussSpan); // Ensure this function is implemented correctly
    setReactionForces(reaction);
  }
 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Truss Type Selection */}
      <FormControl>
        <FormLabel>Choose Truss Type</FormLabel>
        <RadioGroup row value={trussType} onChange={handleTrussTypeChange}>
          <FormControlLabel value="pratt" control={<Radio />} label="Pratt Truss" />
          <FormControlLabel value="howe" control={<Radio />} label="Howe Truss" />
          <FormControlLabel value="warren" control={<Radio />} label="Warren Truss" />
        </RadioGroup>
      </FormControl>

      {/* Truss Diagram based on selection */}
      {trussType === "pratt" && <TrussDiagramP trussSpan={trussSpan} trussHeight={trussHeight} forces={forces} />}
      {trussType === "howe" && <TrussDiagramH trussSpan={trussSpan} trussHeight={trussHeight} forces={forces} />}
      {trussType === "warren" && <TrussDiagramW trussSpan={trussSpan} trussHeight={trussHeight} forces={forces} />}

      {/* Truss Dimensions */}
      <Typography variant="h4" sx={{ mt: 3 }}>
        Truss Dimensions
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <TextField
          value={trussHeight / 10} // Show scaled-down value
          onChange={handleNumericChange(setTrussHeight)}
          type="number"
          label="Truss Height"
          InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
          variant="outlined"
        />
        <TextField
          value={trussSpan / 10} // Show scaled-down value
          onChange={handleNumericChange(setTrussSpan)}
          type="number"
          label="Truss Span"
          InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }}
          variant="outlined"
        />
      </Box>

      {/* Truss Forces */}
      <Typography variant="h4" sx={{ mt: 3 }}>
        Truss Forces
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "60%", mt: 2 }}>
        {forces.map((force, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              width: "100%",
              mb: 1,
            }}
          >
            <TextField
              label="Node"
              type="number"
              value={force.node}
              onChange={(e) => updateForce(index, "node", parseInt(e.target.value) || 0)}
              variant="outlined"
            />
            <TextField
              label="Fx (N)"
              type="number"
              value={force.fx}
              onChange={(e) => updateForce(index, "fx", parseFloat(e.target.value) || 0)}
              variant="outlined"
              InputProps={{ endAdornment: <InputAdornment position="end">kN</InputAdornment> }}
            />
            <TextField
              label="Fy (N)"
              type="number"
              value={force.fy}
              onChange={(e) => updateForce(index, "fy", parseFloat(e.target.value) || 0)}
              variant="outlined"
              InputProps={{ endAdornment: <InputAdornment position="end">kN</InputAdornment> }}
            />
          </Box>
        ))}
        <Button variant="contained" onClick={addForce} sx={{ mt: 2 }}>
          Add Force
        </Button>
        <Button variant="contained" onClick={calculateReactionForces} sx={{ mt: 2 }}>Calculate Reaction Forces</Button>
        {ReactionForces && <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ra</TableCell>
            <TableCell align="right">Rb</TableCell>
            <TableCell align="right">Ha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{ReactionForces.Ra}</TableCell>
              <TableCell align="right">{ReactionForces.Rb}</TableCell>
              <TableCell align="right">{ReactionForces.Ha}</TableCell>
            </TableRow>
          }
        </TableBody>
        
      </Table>

    </TableContainer>}
    
      </Box>
    </Box>
  );
};
