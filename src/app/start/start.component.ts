import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  template: `
    <div class="container">
      <div class="content">
        <div class="title">
          Angular Minesweeper
        </div>
        <div class="description">
          Simple implementation of Minesweeper game.
        </div>
        <div class="glow">
          <a routerLink="/game">Start</a>
        </div>
      </div>
      <div class="footer">
        Damian Polak 2022, <a href="https://github.com/damianpolak/minesweeper" target="_blank">Minesweeper</a>
      </div>
    </div>
  `,
  styles: [`
    .container {
      position: absolute;
      height: 100%;
      width: 100%;
      font-family: 'Pixel';
      text-shadow: 2px 2px #2c0c0c;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      user-select: none;

      div {
        text-align: center;
        font-size: 1.8em;
        text-decoration: none;
        color: #fff;

        .description {
          font-size: 1rem;
          font-family: Monospace, "Courier New";
          text-shadow: 2px 2px #2c0c0c;
          padding-top: 0.3rem;
        }
      }

      a {
        text-decoration: none;
        color: White;
      }

      .glow {
        animation: glow2 1.5s ease-in-out infinite alternate;
        user-select: none;
        padding-top: 1rem;
        font-size: 1.5rem;
      }

      .glow:hover {
        animation: glow1 1.5s ease-in-out infinite alternate;
        user-select: none;
      }

      .footer {
        position: absolute;
        font-size: 0.8rem;
        font-family: Monospace, "Courier New";
        bottom: 1rem;

        a:hover {
          // text-decoration: underline;
          color: #ffff00;
        }
      }
    }

    @keyframes glow1 {
      from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #228dff,
          0 0 70px #228dff, 0 0 80px #228dff, 0 0 100px #228dff, 0 0 150px #228dff;
      }
      to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228dff,
          0 0 35px #228dff, 0 0 40px #228dff, 0 0 50px #228dff, 0 0 75px #228dff;
      }
    }

    @keyframes glow2 {
      from {
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ffdd1b,
          0 0 70px #ffdd1b, 0 0 80px #ffdd1b, 0 0 100px #ffdd1b, 0 0 150px #ffdd1b;
      }
      to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffdd1b,
          0 0 35px #ffdd1b, 0 0 40px #ffdd1b, 0 0 50px #ffdd1b, 0 0 75px #ffdd1b;
      }
    }
  `]
})
export class StartComponent implements OnInit {
  ngOnInit() {
    console.log(`Welcome to Angular Minesweeper`);
  }
}
