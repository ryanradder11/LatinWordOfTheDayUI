import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { WordOfTheDay } from '../../store/word-of-the-day.state';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        Toolbar,
        Button,
        Dialog,
        InputText,
        Textarea,
        ConfirmDialog,
        Toast,
        IconField,
        InputIcon,
    ],
    providers: [ConfirmationService, MessageService],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
    private adminService = inject(AdminService);
    private authService = inject(AuthService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    words = signal<WordOfTheDay[]>([]);
    wordDialog = false;
    editingWord: Partial<WordOfTheDay> = {};
    isNew = false;
    loading = false;
    searchValue = '';
    synonymsText = '';
    antonymsText = '';

    ngOnInit(): void {
        this.loadWords();
    }

    loadWords(): void {
        this.loading = true;
        this.adminService.getAllWords().subscribe({
            next: (words) => {
                this.words.set(words);
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load words',
                });
            },
        });
    }

    openNew(): void {
        this.editingWord = {
            word: '',
            definition: '',
            pronunciation: '',
            origin: '',
            example0: '',
            example0_latin: '',
            example1: '',
            example1_latin: '',
            example2: '',
            example2_latin: '',
            synonyms: [],
            antonyms: [],
            image: '',
        };
        this.synonymsText = '';
        this.antonymsText = '';
        this.isNew = true;
        this.wordDialog = true;
    }

    editWord(word: WordOfTheDay): void {
        this.editingWord = { ...word };
        this.synonymsText = (word.synonyms || []).join(', ');
        this.antonymsText = (word.antonyms || []).join(', ');
        this.isNew = false;
        this.wordDialog = true;
    }

    saveWord(): void {
        if (!this.editingWord.word?.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Word is required',
            });
            return;
        }

        this.editingWord.synonyms = this.synonymsText
            ? this.synonymsText.split(',').map((s) => s.trim()).filter(Boolean)
            : [];
        this.editingWord.antonyms = this.antonymsText
            ? this.antonymsText.split(',').map((s) => s.trim()).filter(Boolean)
            : [];

        if (this.isNew) {
            this.adminService
                .createWord(this.editingWord)
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Created',
                            detail: `${this.editingWord.word} created`,
                        });
                        this.wordDialog = false;
                        this.loadWords();
                    },
                    error: () =>
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create word',
                        }),
                });
        } else {
            this.adminService
                .updateWord(this.editingWord.id!, this.editingWord)
                .subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Updated',
                            detail: `${this.editingWord.word} updated`,
                        });
                        this.wordDialog = false;
                        this.loadWords();
                    },
                    error: () =>
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update word',
                        }),
                });
        }
    }

    confirmDelete(word: WordOfTheDay): void {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete "${word.word}"?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.adminService.deleteWord(word.id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Deleted',
                            detail: `${word.word} deleted`,
                        });
                        this.loadWords();
                    },
                    error: () =>
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to delete word',
                        }),
                });
            },
        });
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains',
        );
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/aditus']);
    }
}
