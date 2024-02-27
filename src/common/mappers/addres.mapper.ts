import { Addre } from "src/addres/entities/addre.entity";

export function mapAddressResults(addresses: Addre[]) {
    const uniqueProfile = addresses.length > 0 ? mapProfile(addresses[0].user) : null;
  
    const mappedAddresses = addresses.map(address => ({
      id: address.id,
      addres: address.addres,
      postalCode: address.postalCode,
      commune: address.commune,
      userEmail: address.user?.email,
    }));
  
    return [
      {
        profile: uniqueProfile,
      },
      ...mappedAddresses,
    ];
  }
  
  function mapProfile(profile) {
    return {
      id: profile.id,
      name: profile.name,
      lastName: profile.lastName,
      rut: profile.rut,
      user: mapUser(profile.user),
    };
  }
  
  function mapUser(user) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      deletedAT: user.deletedAT,
    };
  }