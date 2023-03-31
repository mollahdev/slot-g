import { Config } from './types';

class Cursor {
    cursor!: HTMLElement;
    target!: HTMLElement;
    isBig: boolean;
    constructor( public config: Config ) {
        this.isBig = false;
        this.config = Object.assign({
            cursorId: "cursor-js-pointer",
            activeClass: 'cursor-js-active',
            defaultColor: '#efefef',
            activeTag: 'a' 
        }, config || {});

        this.insertCursor();
        this.captureMouseMove();
        this.toggleCursorSize();
    }

    private insertCursor() {
        // create stylesheet
        const 
            style =  `
                body {
                    cursor: none;
                    background-color: #000;
                }

                #${this.config.cursorId} {
                    position: fixed;
                    z-index: 999999;
                    width: 14px;
                    height: 14px;
                    pointer-events: none;
                    cursor: none;
                    left: 0;
                    top: 0;
                }

                #${this.config.cursorId}:not(.blend-off) {
                    mix-blend-mode: difference;
                }

                #${this.config.cursorId}__inner {
                    position: relative;
                    background-color: ${this.config.defaultColor};
                    border-radius: 50%;
                    height: 100%;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    transition: width .3s, height .3s;
                }

                #${this.config.cursorId}__inner * {
                    transform: scale(0);
                    transition: all .3s;
                }

                #${this.config.cursorId}.active #${this.config.cursorId}__inner {
                    width: 75px;
                    height: 75px;
                }

                #${this.config.cursorId}.active #${this.config.cursorId}__inner * {
                    transform: scale(1);
                }
            `,
            sheet = document.createElement('style');
            sheet.innerHTML = style;
            document.head.appendChild(sheet);
        
        // create cursor html element
        const 
            div = document.createElement('div');
            div.setAttribute("id", this.config.cursorId);
            div.innerHTML = `
                <div id="${this.config.cursorId}__inner"></div>
            `
            document.body.appendChild( div );
    }

    private captureMouseMove() {
        this.cursor = document.getElementById( this.config.cursorId )!

        /**
         * on mouse move event 
         */ 
        document.addEventListener('mousemove', (ev: MouseEvent) => {
            this.cursor.setAttribute("style", `transform: translate3d(${ev.clientX}px, ${ev.clientY}px, 0px);`)
            if( ev && ev.target ) {
                this.target = ev.target as HTMLDivElement;
                this.cursorContent()
            }
        })

        /**
         * on mouse scroll event 
         */ 
        document.addEventListener('scroll', () => {
            const { x, y } = this.cursor.getBoundingClientRect()
            const element = document.elementFromPoint(x, y);
            if( element ) {
                this.target = element as HTMLDivElement;
                this.cursorContent()
            }
        })
    }

    private cursorContent() {
        if( this.target.classList.contains( this.config.activeClass ) && !this.isBig) {
            this.isBig = true;
            this.toggleCursorSize()
            this.addContent()
            this.toggleColor()
            this.toggleBlend()
        } 
        
        if( !this.target.classList.contains( this.config.activeClass) && this.isBig ) {
            this.isBig = false;
            this.toggleCursorSize()
            this.toggleColor()
            this.toggleBlend()
        }
    }

    private toggleCursorSize() {
        this.cursor.classList.toggle('active', this.isBig)
    }

    private addContent() {
        if( !this.target.dataset.cursorContent || !this.config.content) return;
        if( Reflect.has( this.config.content, this.target.dataset.cursorContent ) ) {
            const id = this.target.dataset.cursorContent
            const content = this.config.content[id]
            const innerEl = document.getElementById(`${this.config.cursorId}__inner`)! as HTMLElement;
            innerEl.innerHTML = `<span>${content}</span>`;
        }
    }

    private toggleColor() {
        const innerEl = document.getElementById(`${this.config.cursorId}__inner`)! as HTMLElement;
        if( this.isBig && this.target.dataset.cursorColor ) {
            innerEl.style.backgroundColor = this.target.dataset.cursorColor
        } else {
            innerEl.style.backgroundColor = this.config.defaultColor;
        }
    }

    private toggleBlend() {
        this.cursor.classList.toggle("blend-off", this.isBig && this.target.dataset.cursorBlend === "off")
    }
}

window.Cursor = Cursor;