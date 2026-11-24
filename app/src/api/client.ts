/** Seul endroit qui appelle le réseau : les composants passent par des hooks qui utilisent ce module. */
export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur ${response.status} sur ${url}`);
  return (await response.json()) as T;
}

export async function getText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur ${response.status} sur ${url}`);
  return response.text();
}
