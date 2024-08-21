import { AppShell, Box, Burger, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Chat } from "./components/chat/Chat"

function App() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="sm"
					size="sm"
				/>
				<Group align="center" h="100%" px="md">
					Logo etc.
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">Navbar</AppShell.Navbar>

			<AppShell.Main>
				<Box h="calc(100vh - 60px - 2 * var(--mantine-spacing-md))">
					<Chat />
				</Box>
			</AppShell.Main>
		</AppShell>
	);
}

export default App
