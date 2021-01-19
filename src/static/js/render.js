class Rook
{
    constructor(team)
    {
        this.team = team;
        this.name = 'rook';
    }
}

class Knight
{
    constructor(team)
    {
        this.team = team;
        this.name = 'knight';
    }
}

class Bishop
{
    constructor(team)
    {
        this.team = team;
        this.name = 'bishop';
    }
}

class King
{
    constructor(team)
    {
        this.team = team;
        this.name = 'king';
    }
}

class Queen
{
    constructor(team)
    {
        this.team = team;
        this.name = 'queen';
    }
}

class Pawn
{
    constructor(team)
    {
        this.team = team;
        this.name = 'pawn';
    }
}

const BOARD_SIZE = 8;
const BLACK_COLOR = 'black';
const WHITE_COLOR = 'white';
const BLACK = false;
const WHITE = true;

const STARTING_BOARD = [
    [new Rook(BLACK), new Knight(BLACK), new Bishop(BLACK), new King(BLACK), new Queen(BLACK), new Bishop(BLACK), new Knight(BLACK), new Rook(BLACK)],
    [new Pawn(BLACK), new Pawn(BLACK), new Pawn(BLACK), new Pawn(BLACK), new Pawn(BLACK), new Pawn(BLACK), new Pawn(BLACK), new Pawn(BLACK)],
    [],
    [],
    [],
    [],
    [new Pawn(WHITE), new Pawn(WHITE), new Pawn(WHITE), new Pawn(WHITE), new Pawn(WHITE), new Pawn(WHITE), new Pawn(WHITE), new Pawn(WHITE)],
    [new Rook(WHITE), new Knight(WHITE), new Bishop(WHITE), new Queen(WHITE), new King(WHITE), new Bishop(WHITE), new Knight(WHITE), new Rook(WHITE)]
];
var board = [];
var images = {};
const IMG_PATH = './static/img';

const canvas = document.getElementById('chess-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

function setup_board()
{
    board = STARTING_BOARD;
}

function get_texture_path(filename)
{
    return `${IMG_PATH}/${filename}.png`
}

function setup_image(image_name)
{
    images[image_name] = new Image();
    images[image_name].src = get_texture_path(image_name);
}

function setup_textures()
{
    setup_image('rook_black');
    setup_image('knight_black');
    setup_image('bishop_black');
    setup_image('king_black');
    setup_image('queen_black');
    setup_image('pawn_black');

    setup_image('rook_white');
    setup_image('knight_white');
    setup_image('bishop_white');
    setup_image('king_white');
    setup_image('queen_white');
    setup_image('pawn_white');
}

function get_texture_by_object(piece)
{
    if (piece.team === BLACK)
    {
        return images[piece.name + '_black'];
    } else {
        // white
        return images[piece.name + '_white'];
    }
}

function draw_board()
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
                current_color = WHITE_COLOR;
            }
            else {
                // black
                current_color = BLACK_COLOR;
            }

            ctx.fillStyle = current_color;
            ctx.fillRect((x * fill_width_size), (y * fill_height_size), ((x + 1) * fill_width_size), ((y + 1) * fill_height_size));

            color = !color;
        }

        color = !color;
    }

    // ctx.fillStyle = BLACK;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pieces
    for (let y = 0; y < BOARD_SIZE; y++)
    {
        for (let x = 0; x < BOARD_SIZE; x++)
        {
            current_piece = board[y][x];

            if (current_piece !== undefined)
            {
                let piece_texture = get_texture_by_object(current_piece);
                ctx.drawImage(piece_texture, (x * fill_width_size), (y * fill_height_size), fill_width_size, fill_height_size);
            }
        }
    }
}

function detect_square_by_click(cursor_x, cursor_y)
{
    let fill_width_size = canvas.width * 0.125; // 12.5% of width (1/8 of the board)
    let fill_height_size = canvas.height * 0.125; // 12.5% of width (1/8 of the board)

    for (let y = 0; y < BOARD_SIZE; y++)
    {
        for (let x = 0; x < BOARD_SIZE; x++)
        {
            if (cursor_x > (x * fill_width_size))
            {
                if (cursor_y > (y * fill_height_size))
                {
                    if (((x + 1) * fill_width_size) > cursor_x)
                    {
                        if (((y + 1) * fill_height_size) > cursor_y)
                        {
                            return {
                                y: y,
                                x: x
                            };
                        }
                    }
                }
            }
        }
    }
}

function on_start()
{
    setup_board();
    setup_textures();
    console.log(board);
    setInterval(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw_board();
    }, 10);
}

canvas.addEventListener('click', (event) => {
    // console.log(event.pageX, event.pageY);
    console.log(detect_square_by_click(event.pageX, event.pageY));
}, false);
on_start();
// const board = [[]]
