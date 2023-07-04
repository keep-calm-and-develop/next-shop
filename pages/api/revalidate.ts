
async function handleRevalidate(req, res) {
    const event = req.body;
    if (event.model === 'product') {
        const id = event.entry.id;
        await Promise.all([
            res.revalidate('/'),
            res.revalidate(`/products/${id}`),
        ]);
        console.log('[Product] Revalidation successful')
    }
    res.status(204).end();
}

export default handleRevalidate;
