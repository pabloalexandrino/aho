export default function beforeUnload() {
    const handleBeforeUnload = (e: any) => {
        e.preventDefault()
        e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
    }
}
