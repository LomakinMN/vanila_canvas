# vanila_canvas

## Overview

This project demonstrates how to draw a room with walls and place a sofa inside it using HTML5 Canvas and JavaScript. The sofa snaps to the nearest wall when placed close enough.

## Features

- Draw walls by clicking on the canvas.
- Snap walls to a grid for precise placement.
- Place a sofa inside the room, which snaps to the nearest wall.

## Getting Started

### Prerequisites

- A modern web browser that supports HTML5 and JavaScript.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/LomakinMN/vanila_canvas.git
   ```
2. Navigate to the project directory:
   ```sh
   cd vanila_canvas
   ```

### Usage

1. Open `index.html` in your web browser.
2. Click the "Начать" button to start drawing the room.
3. Click on the canvas to place points for the walls.
4. Close the room by clicking on the starting point.
5. Move the cursor to place the sofa inside the room.

## Project Structure

- `index.html`: The main HTML file.
- `src/index.js`: Handles the main logic for drawing and placing the sofa.
- `src/sofa.js`: Contains functions for drawing and snapping the sofa to the walls.
- `images/sofa.png`: The image used for the sofa.
