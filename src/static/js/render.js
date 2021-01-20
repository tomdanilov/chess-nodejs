class Rook
{
    constructor(team)
    {
        this.team = team;
        this.name = 'rook';
        this.is_valid_move = (src, dest) => {
            if ((src.x != dest.x) && (src.y != dest.y))
            {
                // the move wasn't straight line, invalid move.
                return false;
            }

            if (src.x == dest.x)
            {
                // moved on the y-axis
                let diff = Math.abs(dest.y - src.y); // difference of the src to the dest

                if (diff == 1)
                {
                    // move one forward or backward
                    return true;
                }

                if (dest.y > src.y)
                {
                    // moved down
                    for (let y = (src.y + 1); y <= (dest.y - 1); y++)
                    {
                        let piece = board[y][src.x];

                        if (piece !== undefined)
                        {
                            // there's piece, invalid move
                            return false;
                        }
                    }
                }
                else {
                    // move up
                    for (let y = (src.y - 1); y >= (dest.y + 1); y--)
                    {
                        let piece = board[y][src.x];

                        if (piece !== undefined)
                        {
                            // there's piece, invalid move
                            return false;
                        }
                    }
                }
            }
            else {
                // moved on the x-axis
                let diff = Math.abs(dest.x - src.x); // difference of the src to the dest

                if (diff == 1)
                {
                    // move one left or right
                    return true;
                }

                if (dest.x > src.x)
                {
                    // moved right
                    for (let x = (src.x + 1); x <= (dest.x - 1); x++)
                    {
                        let piece = board[src.y][x];

                        if (piece !== undefined)
                        {
                            // there's piece, invalid move
                            return false;
                        }
                    }
                }
                else {
                    // move left
                    for (let x = (src.x - 1); x >= (dest.x + 1); x--)
                    {
                        let piece = board[src.y][x];

                        if (piece !== undefined)
                        {
                            // there's piece, invalid move
                            return false;
                        }
                    }
                }
            }

            return true;
        };
    }
}

class Knight
{
    constructor(team)
    {
        this.team = team;
        this.name = 'knight';
        this.is_valid_move = (src, dest) => {
            if ((src.x + 2 == dest.x) && ((src.y + 1 == dest.y) || (src.y - 1 == dest.y)))
            {
                return true;
            }
            else if ((src.x - 2 == dest.x) && ((src.y + 1 == dest.y) || (src.y - 1 == dest.y)))
            {
                return true;
            }
            else if ((src.y + 2 == dest.y) && ((src.x + 1 == dest.x) || (src.x - 1 == dest.x)))
            {
                return true;
            }
            else if ((src.y - 2 == dest.y) && ((src.x + 1 == dest.x) || (src.x - 1 == dest.x)))
            {
                return true;
            }

            return false;
        }
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
        this.is_valid_move = (src, dest) => {
            if (Math.abs(src.x - dest.x) < 2 && Math.abs(src.y - dest.y) < 2)
            {
                return true;
            }

            return false;
        }
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
        this.moved = false;
        this.team = team;
        this.name = 'pawn';
        if (team)
        {
            // White UP
            this.changeval = -1;
        } else {
            // Black DOWN
            this.changeval = 1;
        }

        this.is_valid_move = (src, dest) => {
            if (!this.moved)
            {
                if ( ((src.y + (2 * this.changeval) == dest.y) || (src.y + this.changeval == dest.y)) && src.x == dest.x )
                {
                    if ((src.y + (2 * this.changeval) == dest.y))
                    {
                        let piece = board[src.y + this.changeval][src.x];

                        if (piece != undefined)
                        {
                            return false;
                        }
                    }

                    if (src.y + this.changeval == dest.y)
                    {
                        let piece = board[dest.y][dest.x];

                        if (piece != undefined)
                        {
                            return false;
                        }
                    }

                    this.moved = true;
                    return true;
                }
            } else {
                if ((src.y + this.changeval == dest.y) && src.x == dest.x)
                {
                    // move
                    return true;
                }

                if ((src.y + this.changeval == dest.y) && ((src.x + 1 == dest.x) || (src.x - 1 == dest.x)))
                {
                    // eat
                    if (board[dest.y][dest.x] != undefined)
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}

const BOARD_SIZE = 8;
const BLACK_COLOR = 'black';
const WHITE_COLOR = 'white';
const BLUE_COLOR = 'blue';
const RED_COLOR = 'red';
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

// Used for move detection
var src_square = null;
var dest_square = null;
var mark_square = null; // square that will be marked in red when choosing the dest square

// Turn
var turn = WHITE;
var turn_element = document.getElementById('turn');

// Error interval
var error_interval;
var error_disapper = 0;
var error_element = document.getElementById('error-msg');

function post_error(err_msg)
{
    try {
        clearInterval(error_interval);
    } catch (error) { };

    error_element.innerText = err_msg;
    error_element.style.visibility = 'visible';

    error_disapper = 2;
    error_interval = setInterval(() => {
        error_disapper--;

        if (!error_disapper)
        {
            error_element.innerText = '';
            error_element.style.visibility = 'hidden';
            clearInterval(error_interval);
        }
    }, 1000);
}

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

    // Mark source square
    if (src_square)
    {
        ctx.lineWidth = 4;
        ctx.strokeStyle = BLUE_COLOR;
        ctx.strokeRect((src_square.x * fill_width_size), (src_square.y * fill_height_size), fill_width_size, fill_height_size);
    }

    // Mark the mark requested square
    if (mark_square && (!is_same_position(mark_square, src_square)))
    {
        ctx.lineWidth = 4;
        ctx.strokeStyle = RED_COLOR;
        ctx.strokeRect((mark_square.x * fill_width_size), (mark_square.y * fill_height_size), fill_width_size, fill_height_size);
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

function is_same_position(src, dest)
{
    try {
        return (src.x == dest.x) && (src.y == dest.y);
    } catch (error) {
        return false;
    }
}

function is_valid_piece(square)
{
    // Check if piece is an allay piece or blank piece
    let piece = board[square.y][square.x];

    if (piece === undefined)
    {
        return false;
    } else if (piece.team !== turn)
    {
        return false;
    }

    return true;
}

function valid_move(src, dest)
{
    let piece = board[src.y][src.x];
    
    if (is_same_position(src, dest))
    {
        // same square chosen, invalid move
        post_error('You chose same square');
        return false;
    }

    if (!is_valid_piece(src))
    {
        // check if the piece you try to move is your piece, if not then invalid move
        let turn_display;

        if (turn)
        {
            // White
            turn_display = 'white';
        } else {
            // Black
            turn_display = 'black';
        }

        post_error(`You chose to move enemy piece/blank. Current turn is ${turn_display}`);
        return false;
    }

    if (is_valid_piece(dest))
    {
        // check if the destination piece is your piece, you can't eat your piece, invalid move
        post_error('You can\'t eat your pieces');
        return false;
    }

    try {
        if (piece.is_valid_move(src, dest))
        {
            return true;
        } else {
            post_error('Move is invalid');
            return false;
        }
    } catch (error)
    {
        console.log('The peice don\'t have `is_valid_move` method.')
        return true;
    }
}

function update_turn()
{
    turn = !turn;

    if (turn)
    {
        // White
        turn_element.innerText = 'WHITE';
    } else {
        // Black
        turn_element.innerText = 'BLACK';
    }
}

function on_start()
{
    setup_board();
    setup_textures();

    setInterval(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.95; // 95% of the window
        draw_board();
    }, 10);
}

canvas.addEventListener('click', (event) => {
    let clicked_pos = detect_square_by_click(event.pageX, event.pageY);
    mark_square = null;

    if (!src_square)
    {
        src_square = clicked_pos;
    } else {
        dest_square = clicked_pos;

        // src, dest actions
        if (valid_move(src_square, dest_square))
        {
            board[dest_square.y][dest_square.x] = board[src_square.y][src_square.x];
            delete board[src_square.y][src_square.x];

            update_turn();
        }

        // reset
        src_square = null;
        dest_square = null;
    }
}, false);

canvas.addEventListener('mousemove', (event) => {
    let moved_pos = detect_square_by_click(event.pageX, event.pageY);
    mark_square = moved_pos;
}, false);

on_start();
