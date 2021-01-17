const BOARD_SIZE = 8;
const BLACK = 'black';
const WHITE = 'white';

const canvas = document.getElementById('chess-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

function fill_board()
{
    let color = false; // true = white, false = black
    let fill_width_size = canvas.innerWidth * 0.125; // 12.5% of width (1/8 of the board)

    for (let x = 0; x < BOARD_SIZE; x++)
    {
        for (let y = 0; y < BOARD_SIZE; y++)
        {
            let current_color;

            if (color)
            {
                // white
                current_color = WHITE;
            }
            else {
                // black
                current_color = BLACK;
            }

            ctx.fillStyle = current_color;
            ctx.fillRect(x+5, y+5, 20, 20);

            current_color = !current_color;
        }
    }

    // ctx.fillStyle = BLACK;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
}

fill_board();
// const board = [[]]
