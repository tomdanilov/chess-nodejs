const BOARD_SIZE = 8;
const BLACK = 'black';
const WHITE = 'white';

const canvas = document.getElementById('chess-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

function fill_board()
{
    let color = true; // true = white, false = black
    let fill_width_size = canvas.width * 0.125; // 12.5% of width (1/8 of the board)
    let fill_height_size = canvas.height * 0.125; // 12.5% of width (1/8 of the board)
    // console.log(canvas.innerWidth);

    for (let y = 0; y < BOARD_SIZE; y++)
    {
        for (let x = 0; x < BOARD_SIZE; x++)
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
            ctx.fillRect((x * fill_width_size), (y * fill_height_size), ((x + 1) * fill_width_size), ((y + 1) * fill_height_size));

            color = !color;
        }

        color = !color;
    }

    // ctx.fillStyle = BLACK;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
    fill_board();
}, 1000)
// const board = [[]]
