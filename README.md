# 🏗️ Truss Analysis and Visualization

## 📌 Overview
This project is a web-based application for analyzing and visualizing truss structures. It allows users to input truss dimensions, apply forces at specific nodes, and calculate reaction forces. The truss structure is dynamically visualized using `react-konva`, and Material UI components provide an interactive user interface.

## 🔥 Features
- 🔹 **Truss Type Selection**: Choose between Pratt, Howe, and Warren trusses.
- 📏 **Truss Dimension Input**: Users can specify span and height.
- ⚡ **Force Application**: Apply forces at different nodes in X and Y directions.
- ⚖️ **Reaction Force Calculation**: Computes reaction forces at supports.
- 🎨 **Dynamic Visualization**: Displays the truss structure and applied forces.

## 🛠️ Technologies Used
- ⚛️ **React**: Frontend framework
- 🖌️ **react-konva**: Canvas-based rendering for the truss diagram
- 🎨 **Material-UI (MUI)**: UI components for input fields and layout
- 🏷️ **TypeScript**: Ensures type safety
- 📜 **JavaScript**: Core functionality

## 📁 Project Structure
```
truss-project/
│-- src/
│   │-- App.tsx               # Main application entry
│   │-- Truss_screen.tsx      # Main truss UI and logic
│   │-- TrussDiagramP.tsx     # Pratt truss visualization
│   │-- TrussDiagramH.tsx     # Howe truss visualization
│   │-- TrussDiagramW.tsx     # Warren truss visualization
│   │-- Calculation/
│   │   │-- ReactionForce.tsx  # Reaction force calculations
│   │   │-- MemberForce.tsx  # Member
│   │   │-- ForceType.tsx  # Type 
│   │-- components/
│   │   │-- Header.tsx        # Header component
│   │   │-- Footer.tsx        # Footer component
│-- public/
│-- package.json
│-- README.md
```

## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jatin-trivedi/Truss-Analysis-.git
   cd truss-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 🎯 Usage
1. 🔘 Select the truss type (Pratt, Howe, or Warren).
2. 🔢 Enter truss height and span.
3. 🎯 Add forces at specific nodes.
4. 📊 Click **"Calculate Reaction Forces"** to view computed values.
5. 🏗️ Observe the updated truss diagram with applied forces.

## 🔮 Future Enhancements
- 🏗️ **Support for Custom Truss Configurations**
- 📊 **Integration with Finite Element Analysis**
- 📑 **Exporting Analysis Reports**
- ✨ **Enhanced UI/UX with Animations**

---
💡 **Feel free to contribute or provide feedback! 🚀**

