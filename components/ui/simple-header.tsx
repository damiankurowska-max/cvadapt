'use client';

import React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import Logo from '@/app/components/Logo';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{ label: 'Fonctionnalités', href: '#features' },
		{ label: 'Tarifs', href: '/tarifs' },
		{ label: 'Blog', href: '/blog' },
	];

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<Logo size={28} />
					<span className="font-mono text-lg font-bold text-blue-600">CVAdapt</span>
				</Link>

				{/* Desktop nav */}
				<div className="hidden items-center gap-1 lg:flex">
					{links.map((link) => (
						<Link
							key={link.label}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
						>
							{link.label}
						</Link>
					))}
					<div className="ml-2 flex items-center gap-2">
						<Link href="/sign-in" className={buttonVariants({ variant: 'outline' })}>
							Connexion
						</Link>
						<Link href="/generate" className={buttonVariants({ variant: 'default' })}>
							Commencer — Gratuit
						</Link>
					</div>
				</div>

				{/* Mobile burger */}
				<Sheet open={open} onOpenChange={setOpen}>
					<Button
						size="icon"
						variant="outline"
						className="lg:hidden"
						aria-label="Menu"
						onClick={() => setOpen(!open)}
					>
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-6"
						/>
					</Button>
					<SheetContent
						className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
						showClose={false}
						side="left"
					>
						{/* Logo in drawer */}
						<div className="flex items-center gap-2 border-b px-4 py-4">
							<Logo size={24} />
							<span className="font-mono text-base font-bold text-blue-600">CVAdapt</span>
						</div>

						<div className="grid gap-y-1 overflow-y-auto px-4 pt-4 pb-5">
							{links.map((link) => (
								<Link
									key={link.label}
									className={buttonVariants({
										variant: 'ghost',
										className: 'justify-start',
									})}
									href={link.href}
									onClick={() => setOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</div>

						<SheetFooter>
							<Link
								href="/sign-in"
								className={buttonVariants({ variant: 'outline' })}
								onClick={() => setOpen(false)}
							>
								Connexion
							</Link>
							<Link
								href="/generate"
								className={buttonVariants({ variant: 'default' })}
								onClick={() => setOpen(false)}
							>
								Commencer — Gratuit
							</Link>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
