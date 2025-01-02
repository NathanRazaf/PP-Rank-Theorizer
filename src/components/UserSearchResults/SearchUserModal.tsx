import React, { useState } from 'react';
import { Search } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CompactUser, searchUsers } from "@/api/searchApi.ts";
import CompactUserProfile from "@/components/UserSearchResults/CompactUserProfile.tsx";

const SearchModal = ({ onSelectUser }: { onSelectUser: (username: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<CompactUser[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e : React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const results = await searchUsers(searchQuery);
            setUsers(results);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectUser = (user : CompactUser) => {
        onSelectUser(user.username);
        setIsOpen(false);
        setSearchQuery('');
        setUsers([]);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-3 flex flex-row items-center gap-2 rounded-full bg-osu-bg-1 hover:bg-osu-bg-3 hover:scale-105 transition-all"
                aria-label="Search users"
            >
                Search user <Search className="w-5 h-5" />
            </button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Search Users</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by username..."
                                className="w-full px-4 py-2 rounded-lg !bg-osu-bg-3 focus:outline-none"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                                disabled={isSearching}
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </form>

                        <div className="max-h-96 overflow-y-auto space-y-0 scrollbar-hide">
                            {isSearching ? (
                                <div className="text-center py-4 text-gray-500">Searching...</div>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <button
                                        key={user.osuId}
                                        onClick={() => handleSelectUser(user)}
                                        className="w-full"
                                    >
                                        <CompactUserProfile user={user} />
                                    </button>
                                ))
                            ) : searchQuery && !isSearching ? (
                                <div className="text-center py-4 text-gray-500">No users found</div>
                            ) : null}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};


export default SearchModal;