import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

export default function Navbar({page, setPage}) {

    const handleLogOut = async () => {
        try {
            const response = await fetch('http://localhost:10000/api/usuario/logout', {
                method: "DELETE",
                credentials: "include", // si se usa galletitas :v
            });

            if(!response) throw new Error("No se pudo realizar la conexion")

            localStorage.clear();
            sessionStorage.clear()

            window.location.href = 'login';
        } catch (e) {
            console.error(e.message);
        }
    }

    const itemRenderer = (item) => (
        <>
            <div className='p-menuitem-content'>
                {item.label == 'Logout'
                    ?
                    <a className="flex align-items-center p-menuitem-link" onClick={handleLogOut}>
                        <span className={item.icon} style={{ paddingRight: '10px', }} />
                        <span className="mx-2">{item.label}</span>
                        {item.badge && <Badge className="ml-auto" value={item.badge} />}
                        {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
                    </a>
                    :
                    <a className="flex align-items-center p-menuitem-link">
                        <span className={item.icon} style={{ paddingRight: '10px', }} />
                        <span className="mx-2">{item.label}</span>
                        {item.badge && <Badge className="ml-auto" value={item.badge} />}
                        {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
                    </a>}
            </div>
        </>
    );
    let items = [
        {
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Info', detail: 'Item Selected', life: 3000 });
            },
            template: (item, options) => {
                return (
                    <button onClick={(e) => options.onClick(e)} className='navbar-avatar'>
                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2" shape="circle" />
                        <div className="flex flex-column align avatar-info">
                            <span className="font-bold">Amy Elsner</span>
                        </div>
                    </button>
                );
            }
        },
        {
            label: 'Abitare Administrador',
            items: [
                {
                    label: 'Notificaciones',
                    icon: 'pi pi-bell',
                    badge: 2,
                    template: itemRenderer
                },
                {
                    label: 'Dashboard',
                    icon: 'pi pi-chart-bar',
                    template: itemRenderer,
                    command:()=>{
                        setPage('Hola');
                    }
                },
            ]
        }, 
        {
            label: 'Usuarios',
            items: [
                {
                    label: 'Usuarios',
                    icon: 'pi pi-users',
                    template: itemRenderer,
                    command: () => {
                        setPage('Usuario');
                    }
                }
            ]
        },
        {
            label: 'Edificio',
            items: [
                {
                    label: 'Departamentos',
                    icon: 'pi pi-building',
                    template: itemRenderer
                },
                {
                    label: 'Areas comunes',
                    icon: 'pi pi-flag',
                    template: itemRenderer,
                    command: () => {
                        setPage('Areas comunes')
                    }
                },
                {
                    label: 'Estacionamiento',
                    icon: 'pi pi-car',
                    template: itemRenderer,
                    command: () => {
                        setPage('Estacionamiento')
                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    template: itemRenderer
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center ">
            <Menu model={items} className="w-full md:w-15rem navbar" />
        </div>
    )
}
