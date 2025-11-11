// // import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { ApiService } from '../service/api';

// // @Component({
// //   selector: 'app-chatbot',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './chatbot.html',
// //   styleUrls: ['./chatbot.css']
// // })
// // export class ChatbotComponent implements AfterViewChecked {
// //   chatMessages: { from: 'user' | 'bot'; text: string }[] = [];
// //   userMessage = '';
// //   isOpen = false; // Track if widget is open
// //   isTyping = false; // Show "typing..." while waiting for AI
// //   userId: any;

// //   // Reference to the chat container
// //   @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

// //   constructor(private api: ApiService) {}

// //   toggleChat() {
// //     this.isOpen = !this.isOpen;
// //     if (this.isOpen) {
// //       setTimeout(() => this.scrollToBottom(), 200); // scroll when opening
// //     }
// //   }

// //   sendMessage() {
// //     const userMsg = this.userMessage.trim();
// //     if (!userMsg) return;

// //     this.chatMessages.push({ from: 'user', text: userMsg });
// //     this.userMessage = '';
// //     this.isTyping = true;

// //     this.api.getChatResponse(userMsg, this.userId).subscribe({
// //       next: (res) => {
// //         this.chatMessages.push({ from: 'bot', text: res.answer });
// //         this.isTyping = false;
// //         this.scrollToBottom(); // scroll after bot response
// //       },
// //       error: (err) => {
// //         console.error('Chatbot error:', err);
// //         this.chatMessages.push({
// //           from: 'bot',
// //           text: "Sorry, I couldn't process that. Please try again."
// //         });
// //         this.isTyping = false;
// //         this.scrollToBottom(); // scroll after error message
// //       }
// //     });
// //   }

// //   ngAfterViewChecked() {
// //     this.scrollToBottom(); // auto-scroll after every view update
// //   }

// //   private scrollToBottom(): void {
// //     try {
// //       const container = this.messagesContainer.nativeElement;
// //       container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
// //     } catch (err) {
// //       console.error('Scroll error:', err);
// //     }
// //   }
// // }


// import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ApiService } from '../service/api';

// interface ChatMessage {
//   from: 'user' | 'bot';
//   text?: string;
//   imageUrl?: string;
// }

// @Component({
//   selector: 'app-chatbot',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chatbot.html',
//   styleUrls: ['./chatbot.css']
// })
// export class ChatbotComponent implements AfterViewChecked {
//   chatMessages: ChatMessage[] = [];
//   userMessage = '';
//   isOpen = false; 
//   isTyping = false; 
//   userId?: string;
  

//   @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

//   constructor(private api: ApiService) {}

//   toggleChat() {
//     this.isOpen = !this.isOpen;
//     if (this.isOpen) {
//       setTimeout(() => this.scrollToBottom(), 200);
//     }
//   }

//  async sendMessage() {
//   const userMsg = this.userMessage.trim();
//   if (!userMsg) return;

//   this.chatMessages.push({ from: 'user', text: userMsg });
//   this.userMessage = '';
//   this.isTyping = true;

//   try {
//     let res: any;

//     if (userMsg.toLowerCase().startsWith('generate image') || userMsg.toLowerCase().includes('image of')) {
//       const prompt = userMsg.replace(/generate image|image of/i, '').trim();
//       res = await this.api.generateImage(prompt).toPromise();
//       if (res && res.imageUrl) {
//         this.chatMessages.push({ from: 'bot', imageUrl: res.imageUrl });
//       } else {
//         this.chatMessages.push({ from: 'bot', text: 'Sorry, I could not generate the image.' });
//       }
//     } else {
//       res = await this.api.getChatResponse(userMsg, this.userId).toPromise();
//       if (res && res.answer) {
//         this.chatMessages.push({ from: 'bot', text: res.answer });
//       } else {
//         this.chatMessages.push({ from: 'bot', text: "Sorry, I couldn't process that. Please try again." });
//       }
//     }
//   } catch (err) {
//     console.error('Chatbot error:', err);
//     this.chatMessages.push({
//       from: 'bot',
//       text: "Sorry, I couldn't process that. Please try again."
//     });
//   } finally {
//     this.isTyping = false;
//     this.scrollToBottom();
//   }
// }


//   ngAfterViewChecked() {
//     this.scrollToBottom();
//   }

//  private scrollToBottom(): void {
//   try {
//     const container = this.messagesContainer?.nativeElement;
//     if (container) {
//       container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
//     }
//   } catch (err) {
//     console.error('Scroll error:', err);
//   }
// }

// }


import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api';

interface ChatMessage {
  from: 'user' | 'bot';
  text?: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent implements AfterViewChecked, OnInit {
  chatMessages: ChatMessage[] = [];
  userMessage = '';
  isOpen = false;
  isTyping = false;
  userId?: string; // will store the current user's ID

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private api: ApiService) {}

  // ✅ Load userId from localStorage (set after login)
  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userId = user?._id || user?.id;
      console.log('🧩 Chatbot userId:', this.userId);
    } else {
      console.warn('⚠️ No user found in localStorage — chatbot will treat as guest');
    }
  }

  // ✅ Toggle chatbot open/close
  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 200);
    }
  }

  // ✅ Send message logic
  async sendMessage() {
    const userMsg = this.userMessage.trim();
    if (!userMsg) return;

    // Push user message to chat
    this.chatMessages.push({ from: 'user', text: userMsg });
    this.userMessage = '';
    this.isTyping = true;

    try {
      let res: any;

      // 🖼️ Handle image generation request
      if (
        userMsg.toLowerCase().startsWith('generate image') ||
        userMsg.toLowerCase().includes('image of')
      ) {
        const prompt = userMsg.replace(/generate image|image of/i, '').trim();
        res = await this.api.generateImage(prompt).toPromise();

        if (res && res.imageBase64) {
          this.chatMessages.push({ from: 'bot', imageUrl: res.imageBase64 });
        } else {
          this.chatMessages.push({
            from: 'bot',
            text: 'Sorry, I could not generate the image.'
          });
        }
      } else {
        // 💬 Normal chat message
        res = await this.api.getChatResponse(userMsg, this.userId).toPromise();

        if (res && res.answer) {
          this.chatMessages.push({ from: 'bot', text: res.answer });
        } else {
          this.chatMessages.push({
            from: 'bot',
            text: "Sorry, I couldn't process that. Please try again."
          });
        }
      }
    } catch (err) {
      console.error('Chatbot error:', err);
      this.chatMessages.push({
        from: 'bot',
        text: "Sorry, I couldn't process that. Please try again."
      });
    } finally {
      this.isTyping = false;
      this.scrollToBottom();
    }
  }

  // ✅ Auto-scroll to bottom of chat
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
